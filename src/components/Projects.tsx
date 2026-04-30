import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

// Types
interface TProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

// Constants
const ALL_CATEGORY = "All";
const MAX_VISIBLE_TECH_TAGS = 3;

const Projects = React.memo((): React.ReactElement => {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(ALL_CATEGORY);
  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
        if (!response.ok) throw new Error("Network response was not ok");
        const payload = await response.json();
        // The backend uses a standard response envelope: { success, data, message, error }
        setProjects(payload.data || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = useMemo(
    () => [ALL_CATEGORY, ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  );

  const filteredProjects = useMemo(
    () => (filter === ALL_CATEGORY ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  const handleSelectProject = useCallback((project: TProject) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Featured <span className="text-primary-500">Projects</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-primary-500 text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => handleSelectProject(project)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-medium bg-primary-500 px-4 py-2 rounded-full">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-secondary-500 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, MAX_VISIBLE_TECH_TAGS).map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > MAX_VISIBLE_TECH_TAGS && (
                        <span className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          +{project.technologies.length - MAX_VISIBLE_TECH_TAGS}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-label={selectedProject.title}
              >
                <div className="relative h-64 md:h-80">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <button
                    id="modal-close"
                    onClick={handleCloseModal}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6 md:p-8">
                  <span className="text-sm font-semibold text-primary-500 uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-4">{selectedProject.title}</h3>
                  <p className="text-gray-800 dark:text-gray-300 mb-6 text-base md:text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>
                  <div className="mb-8">
                    <h4 className="font-semibold mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {selectedProject.liveUrl && (
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition">
                        <ExternalLink size={18} /> Live Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                        <FaGithub size={18} /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

export { Projects };
