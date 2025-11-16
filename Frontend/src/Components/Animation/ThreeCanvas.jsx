
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";

// ---- Simple rotating object (quick, no external model) ----
function RotatingBox() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.7;
    ref.current.rotation.x += delta * 0.2;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[1.4, 1.6, 0.2]} />
      <meshStandardMaterial metalness={0.4} roughness={0.6} />
    </mesh>
  );
}

/* ----- Model loader example (use when you have model.glb in /public/assets) -----
function Model({ url = "/assets/your-avatar.glb", scale = 1 }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} />;
}
useGLTF.preload("/assets/your-avatar.glb");
---------------------------------------------------------------------------------*/

export default function ThreeCanvas({
  height = 420,          // px or "100vh" (string) for full screen
  background = false,    // set true to render as page background (absolute)
}) {
  const style = background
    ? {
        position: "absolute",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }
    : { width: "100%", height: typeof height === "number" ? `${height}px` : height };

  return (
    <div style={style}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={<Html center>Loading...</Html>}>
          {/* Quick: rotating box */}
          <RotatingBox />

          {/* To use your GLB avatar, replace RotatingBox with:
              <Model url="/assets/your-avatar.glb" scale={1.2} />
          */}
        </Suspense>

        {/* Optional user controls while developing (remove pointerEvents style if background true) */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
