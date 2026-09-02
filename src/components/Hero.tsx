import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const Hero = React.memo((): React.ReactElement => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-primary-500 font-semibold tracking-wide uppercase text-xs sm:text-sm md:text-base mb-4">
              Welcome to my universe
            </h2>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">Pavan Kalyan</span>
            <br />
            Full Stack Developer
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I build exceptional and accessible digital experiences for the web. Let's turn your ideas into reality.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              View My Work
              <ArrowRight size={18} />
            </a>
            <a
              href="/Pavan kalyan resume_EY.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
            >
              Download Resume
              <Download size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export { Hero };
