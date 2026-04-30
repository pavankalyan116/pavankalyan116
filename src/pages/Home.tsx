import React, { useEffect, lazy, Suspense } from "react";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Contact } from "../components/Contact";

const TechStack = lazy(() =>
  import("../components/TechStack").then((m) => ({ default: m.TechStack })),
);
const Projects = lazy(() =>
  import("../components/Projects").then((m) => ({ default: m.Projects })),
);

const Home = React.memo((): React.ReactElement => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full">
      <Hero />
      <About />
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-primary-500">Loading Tech Stack...</div>}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-primary-500">Loading Projects...</div>}>
        <Projects />
      </Suspense>
      <Contact />
    </main>
  );
});

Home.displayName = "Home";

export { Home };
