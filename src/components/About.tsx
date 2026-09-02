import React from "react";
import { motion } from "framer-motion";
import { Terminal, Lightbulb, Zap } from "lucide-react";
import profileImg from "../assets/pk_professional.png";

// Types
interface TAboutCard {
  icon: React.ReactElement;
  title: string;
  description: string;
}

// Constants
const ABOUT_CARDS: TAboutCard[] = [
  {
    icon: <Terminal className="w-8 h-8 text-primary-500 mb-4" />,
    title: "Clean Code",
    description: "I write clean, maintainable, and highly optimized code following best practices.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-secondary-500 mb-4" />,
    title: "Problem Solver",
    description: "I love tackling complex problems and turning them into simple, elegant solutions.",
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500 mb-4" />,
    title: "Fast Learner",
    description: "Constantly exploring new technologies to keep my skills sharp in a fast-paced industry.",
  },
];

const About = React.memo((): React.ReactElement => {
  return (
    <section id="about" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            About <span className="text-primary-500">Me</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-square max-w-md mx-auto relative rounded-2xl overflow-hidden glass-card p-2 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src={profileImg}
                alt="Pavan Kalyan profile photo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4">Hello! I'm Pavan, a passionate software developer.</h3>
            <p className="text-gray-800 dark:text-gray-300 mb-6 text-base md:text-lg leading-relaxed">
              I specialize in building full-stack applications with modern technologies.
              My journey began when I discovered my love for building things that live on the internet.
              Over the years, I've had the privilege of building software that solves real-world problems.
            </p>
            <p className="text-gray-800 dark:text-gray-300 mb-8 text-base md:text-lg leading-relaxed">
              Whether I'm designing a sleek user interface or optimizing a robust API, I approach every project with dedication and an eye for detail.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {ABOUT_CARDS.map((card) => (
                <div key={card.title} className="glass-card p-6 rounded-xl hover:-translate-y-2 transition-transform">
                  {card.icon}
                  <h4 className="font-bold mb-2">{card.title}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-400">{card.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export { About };
