import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { LoadingProvider, useLoading } from "./context/LoadingProvider";
import { Loading, setProgress } from "./components/Loading";
import { Cursor } from "./components/Cursor";
import { Chatbot } from "./components/Chatbot";

const MOBILE_BREAKPOINT = 768;

const AppContent = React.memo((): React.ReactElement => {
  const { isLoading } = useLoading();
  const [percent, setPercent] = useState(0);

  const isMobile = useMemo(
    () => (typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false),
    [],
  );

  useEffect(() => {
    const { loaded, clear } = setProgress(setPercent);
    loaded().then(() => {
      // Load complete
    });
    return () => clear();
  }, []);

  return (
    <>
      {!isMobile && <Cursor />}
      {isLoading && <Loading percent={percent} />}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </>
  );
});

AppContent.displayName = "AppContent";

const App = (): React.ReactElement => {
  return (
    <LoadingProvider>
      <Router>
        <AppContent />
      </Router>
    </LoadingProvider>
  );
};

App.displayName = "App";

export default App;
