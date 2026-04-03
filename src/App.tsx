import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { LoadingProvider, useLoading } from './context/LoadingProvider';
import Loading, { setProgress } from './components/Loading';
import Cursor from './components/Cursor';

function AppContent() {
  const { isLoading } = useLoading();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const { loaded, clear } = setProgress(setPercent);
    // Let it finish loading naturally
    loaded().then(() => {
      // Load complete
    });
    return () => clear();
  }, []);

  return (
    <>
      <Cursor />
      {isLoading && <Loading percent={percent} />}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <Router>
        <AppContent />
      </Router>
    </LoadingProvider>
  );
}

export default App;
