import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import MarqueeComponent from "react-fast-marquee";
import * as THREE from "three";
const Marquee = (MarqueeComponent as any).default || MarqueeComponent;

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    if (isLoaded) {
      setClicked(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 900);
    }
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          PK
        </a>
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> Full Stack Developer</span> <span>Software Engineer</span>
            <span> Full Stack Developer</span> <span>Software Engineer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;
  
  // Track actual Three.js asset loading
  THREE.DefaultLoadingManager.onProgress = (_url, itemsLoaded, itemsTotal) => {
    const p = Math.floor((itemsLoaded / itemsTotal) * 100);
    if (p > percent) {
      percent = p;
      setLoading(percent);
    }
  };

  // Fallback interval to ensure progress at least shows movement
  let interval = setInterval(() => {
    if (percent < 90) {
      percent += Math.random() * 2;
      setLoading(Math.floor(percent));
    } else {
      clearInterval(interval);
    }
  }, 200);

  function clear() {
    clearInterval(interval);
    THREE.DefaultLoadingManager.onProgress = () => {};
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      const finishInterval = setInterval(() => {
        if (percent < 100) {
          percent += 5;
          setLoading(Math.min(100, Math.floor(percent)));
        } else {
          resolve(100);
          clearInterval(finishInterval);
        }
      }, 10);
    });
  }
  return { loaded, percent, clear };
};
