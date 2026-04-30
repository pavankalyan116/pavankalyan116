import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, useTexture } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

// Constants
const IMAGE_URLS: string[] = [
  "/images/react.webp",
  "/images/react2.webp",
  "/images/next.webp",
  "/images/next1.webp",
  "/images/next2.webp",
  "/images/nextBL.webp",
  "/images/node.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
  "/images/postgresql.webp",
  "/images/python.webp",
  "/images/fastapi.webp",
  "/images/java.webp",
  "/images/cpp.webp",
  "/images/git.webp",
];

const MOBILE_SPHERE_COUNT = 12;
const DESKTOP_SPHERE_COUNT = 40;
const MOBILE_BREAKPOINT = 768;

const SPHERE_SCALES = [0.8, 1.1, 0.9, 1.2, 1.0];

// Types
interface TSphereData {
  scale: number;
}

interface TSphereProps {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
  sphereGeometry: THREE.SphereGeometry;
  isMobile: boolean;
}

interface TPointerProps {
  vec?: THREE.Vector3;
  isActive: boolean;
}

interface TSceneProps {
  isActive: boolean;
  isMobile: boolean;
  sphereGeometry: THREE.SphereGeometry;
}

// Helper functions
const getSpheres = (isMobile: boolean): TSphereData[] =>
  [...Array(isMobile ? MOBILE_SPHERE_COUNT : DESKTOP_SPHERE_COUNT)].map(() => ({
    scale: SPHERE_SCALES[Math.floor(Math.random() * SPHERE_SCALES.length)],
  }));

// Inner components
const SphereGeo = ({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
  sphereGeometry,
  isMobile,
}: TSphereProps): React.ReactElement => {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    const clampedDelta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * clampedDelta * scale,
          -150 * clampedDelta * scale,
          -50 * clampedDelta * scale,
        ),
      );
    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow={!isMobile}
        receiveShadow={!isMobile}
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
};

SphereGeo.displayName = "SphereGeo";

const Pointer = ({ vec = new THREE.Vector3(), isActive }: TPointerProps): React.ReactElement => {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0,
      ),
      0.2,
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
};

Pointer.displayName = "Pointer";

const Scene = ({ isActive, isMobile, sphereGeometry }: TSceneProps): React.ReactElement => {
  const textures = useTexture(IMAGE_URLS);

  const spheres = useMemo(() => getSpheres(isMobile), [isMobile]);

  const materials = useMemo(() => {
    return textures.map((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.set(2, 1);
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: "#ffffff",
        emissiveMap: texture,
        emissiveIntensity: 0.3,
        metalness: 0.5,
        roughness: 1,
        clearcoat: isMobile ? 0 : 0.1,
      });
    });
  }, [textures, isMobile]);

  return (
    <Physics gravity={[0, 0, 0]}>
      <Pointer isActive={isActive} />
      {spheres.map((props, i) => (
        <SphereGeo
          key={i}
          {...props}
          material={materials[Math.floor(Math.random() * materials.length)]}
          isActive={isActive}
          sphereGeometry={sphereGeometry}
          isMobile={isMobile}
        />
      ))}
    </Physics>
  );
};

Scene.displayName = "Scene";

const TechStack = React.memo((): React.ReactElement => {
  const [isActive, setIsActive] = useState(true);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false,
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sphereGeometry = useMemo(
    () => new THREE.SphereGeometry(1, isMobile ? 14 : 20, isMobile ? 14 : 20),
    [isMobile],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const workEl = document.getElementById("work");
      if (workEl) {
        const threshold = workEl.getBoundingClientRect().top;
        setIsActive(scrollY > threshold);
      }
    };

    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(handleScroll, 10);
        setTimeout(() => clearInterval(interval), 1000);
      });
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="techstack" id="skills">
      <div className="tech-fade-top" />
      <h2>My Techstack</h2>

      <Canvas
        shadows={!isMobile}
        dpr={[1, 2]}
        gl={{ alpha: true, stencil: false, depth: false, antialias: !isMobile }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 1000 }}
        onCreated={(state) => {
          state.gl.toneMappingExposure = 1.5;
          if ((state.gl as any).xr) {
            (state.gl as any).xr.enabled = false;
          }
        }}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow={!isMobile}
          shadow-mapSize={isMobile ? [256, 256] : [512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Stars radius={10} depth={50} count={isMobile ? 400 : 2000} factor={4} saturation={0} fade speed={1} />
        <Suspense fallback={null}>
          <Scene isActive={isActive} isMobile={isMobile} sphereGeometry={sphereGeometry} />
        </Suspense>
        {!isMobile && (
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
          </EffectComposer>
        )}
      </Canvas>
      <div className="tech-fade-bottom" />
    </div>
  );
});

TechStack.displayName = "TechStack";

export { TechStack };
