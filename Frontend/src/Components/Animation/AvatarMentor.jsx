import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Preload the model for faster first render
useGLTF.preload("/assets/keshav-avatar.glb");

function AvatarModel({
  url = "/keshav-avatar.glb",
  onWaveDone,
  enableInteraction = true,
}) {
  const group = useRef();
  const { scene } = useGLTF(url);

  // animation / interaction phases
  const [phase, setPhase] = useState("init");
  const [hovered, setHovered] = useState(false);
  const [spinOnClick, setSpinOnClick] = useState(false);

  // drag state
  const [dragging, setDragging] = useState(false);
  const prevPos = useRef({ x: 0, y: 0 });


  const rotVelocity = useRef(0); 

  const BASE_Y = -2.9;   // more negative, moves avatar down 
  const BASE_SCALE = 2.0; // bigger = closer / tighter crop

  // start with a wave
  useEffect(() => {
    setPhase("wave");
    const t = setTimeout(() => setPhase("idle"), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === "idle" && onWaveDone) onWaveDone();
  }, [phase, onWaveDone]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!group.current) return;

    // lock vertical position & scale every frame
    group.current.position.y = BASE_Y;
    group.current.scale.set(BASE_SCALE, BASE_SCALE, BASE_SCALE);


    if (phase === "wave") {
      group.current.rotation.y = Math.sin(t * 12) * 0.25;
      group.current.rotation.x = 0; // ensure no tilt
      return; 
    }
    if (
      phase === "idle" &&
      !hovered &&
      !spinOnClick &&
      Math.abs(rotVelocity.current) < 1e-4
    ) {
      group.current.rotation.y = Math.sin(t * 0.12) * 0.03;
      group.current.rotation.x = 0; // force no tilt
    }

    // apply spinOnClick constant rotation
    if (spinOnClick) {
      rotVelocity.current += delta * 1.6;
    }

    // apply horizontal rotation velocity with damping
    if (Math.abs(rotVelocity.current) > 1e-4) {
      group.current.rotation.y += rotVelocity.current * delta;
      rotVelocity.current *= Math.pow(0.85, delta * 60);
      if (Math.abs(rotVelocity.current) < 1e-4) rotVelocity.current = 0;
    }


    group.current.rotation.x = 0;
  });


  return (
    <group
      ref={group}
      position={[0, BASE_Y, 0]} 
      rotation={[0, 0, 0]}
      onPointerOver={(e) => {
        if (!enableInteraction) return;
        e.stopPropagation();
        setHovered(true);
        rotVelocity.current -= 0.15;
      }}
      onPointerOut={(e) => {
        if (!enableInteraction) return;
        e.stopPropagation();
        setHovered(false);
      }}
      onPointerDown={(e) => {
        if (!enableInteraction) return;
        e.stopPropagation();
        e.target.setPointerCapture(e.pointerId);
        setDragging(true);
        prevPos.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        if (!enableInteraction) return;
        e.stopPropagation();
        setDragging(false);
        try {
          e.target.releasePointerCapture(e.pointerId);
        } catch (err) {}
      }}
      onPointerMove={(e) => {
        if (!enableInteraction || !dragging) return;
        e.stopPropagation();
        const dx = e.clientX - prevPos.current.x;

        group.current.rotation.y += dx * 0.008;
        rotVelocity.current = dx * 0.04;

        prevPos.current = { x: e.clientX, y: e.clientY };
      }}
      onDoubleClick={(e) => {
        if (!enableInteraction) return;
        e.stopPropagation();
        setSpinOnClick((s) => !s);
      }}
      onClick={(e) => {
        if (!enableInteraction) return;
        e.stopPropagation();
        rotVelocity.current += 0.25;
      }}
    >
      <primitive object={scene} />
    </group>
  );
}

export default function AvatarMentor({
  size = 137, 
  username = "User",
  tasks = [],
  enableInteraction = true,
}) {
  const containerStyle = {
    position: "fixed",
    right: 20,
    bottom: 20,
    width: `${size}px`,
    height: `${137}px`,
    zIndex: 9999,
    pointerEvents: "auto",
    touchAction: "none",
  };

  const canvasStyle = {
    width: "100%",
    height: "100%",
    display: "block",
  };

  return (
    <div style={containerStyle} aria-hidden={false}>
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Canvas
          style={canvasStyle}
          camera={{
            position: [0, 1.7, 4.2], 
            fov: 24,                
          }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 2, 2]} intensity={0.9} />
          <Suspense fallback={null}>
            <AvatarModel
              url="/keshav-avatar.glb"
              enableInteraction={enableInteraction}
            />
          </Suspense>

        </Canvas>
      </div>
    </div>
  );
}
