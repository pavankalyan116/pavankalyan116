import { useEffect, lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Contact from '../components/Contact';

const TechStack = lazy(() => import('../components/TechStack'));
const Projects = lazy(() => import('../components/Projects'));

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <Hero />
      <About />
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-primary-500">Loading Tech Stack...</div>}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-primary-500">Loading Projects...</div>}>
        <Projects />
      </Suspense>
      <Contact />
    </div>
  );
};

export default Home;
