// src/components/AvatarMentor.jsx
import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// preload the model for snappier load
useGLTF.preload("/assets/keshav-avatar.glb");

function AvatarModel({
  url = "/assets/keshav-avatar.glb",
  onWaveDone,
  enableInteraction = true,
}) {
  const group = useRef();
  const { scene } = useGLTF(url);

  // animation / interaction phases
  const [phase, setPhase] = useState("init"); // init -> wave -> idle
  const [hovered, setHovered] = useState(false);
  const [spinOnClick, setSpinOnClick] = useState(false);

  // drag state
  const [dragging, setDragging] = useState(false);
  const prevPos = useRef({ x: 0, y: 0 });

  // velocities for inertia
  const rotVelocity = useRef(0);   // horizontal spin velocity (y-axis)
  const tiltVelocity = useRef(0);  // vertical tilt velocity (x-axis)

  // start with a wave
  useEffect(() => {
    setPhase("wave");
    const t = setTimeout(() => setPhase("idle"), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === "idle" && onWaveDone) onWaveDone();
  }, [phase, onWaveDone]);

  // core frame loop - animations + inertia
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!group.current) return;

    // Wave animation (fast back and forth)
    if (phase === "wave") {
      group.current.rotation.y = Math.sin(t * 12) * 0.25;
      // subtle up/down bounce to feel lively
      group.current.position.y = -0.4 + Math.sin(t * 8) * 0.005;
      return; // skip idle/inertia while waving
    }

    // Idle breathing (subtle)
    if (phase === "idle") {
      const s = 1 + Math.sin(t * 1.2) * 0.008;
      group.current.scale.set(s * 1.35, s * 1.35, s * 1.35);
      // slight idle rotation if not interacted
      if (!hovered && !spinOnClick && Math.abs(rotVelocity.current) < 0.0001) {
        group.current.rotation.y = Math.sin(t * 0.12) * 0.03;
      }
    }

    // apply spinOnClick constant rotation
    if (spinOnClick) {
      rotVelocity.current += delta * 1.6; // increase horizontal velocity
    }

    // apply velocities (from drag / spin) to rotation with damping
    // horizontal rotation (Y-axis)
    if (Math.abs(rotVelocity.current) > 1e-4) {
      group.current.rotation.y += rotVelocity.current * delta;
      // damping
      rotVelocity.current *= Math.pow(0.85, delta * 60);
      if (Math.abs(rotVelocity.current) < 1e-4) rotVelocity.current = 0;
    }

    // vertical tilt (X-axis) with clamping
    if (Math.abs(tiltVelocity.current) > 1e-4) {
      const newX = group.current.rotation.x + tiltVelocity.current * delta;
      group.current.rotation.x = Math.max(-0.6, Math.min(0.6, newX));
      tiltVelocity.current *= Math.pow(0.8, delta * 60);
      if (Math.abs(tiltVelocity.current) < 1e-4) tiltVelocity.current = 0;
    }
  });

  // pointer handlers (attached to wrapper group)
  // We'll return the primitive inside a group to attach handlers reliably.
  return (
    <group
      ref={group}
      position={[0, -0.4, 0]}   // chest-up framing
      rotation={[0, 0, 0]}
      onPointerOver={(e) => {
        if (!enableInteraction) return;
        e.stopPropagation();
        setHovered(true);
        // slight responsive nudge
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
        // capture pointer for move events
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
        // small fling inertia based on last move (if any)
      }}
      onPointerMove={(e) => {
        if (!enableInteraction) return;
        if (!dragging) return;
        e.stopPropagation();
        const dx = e.clientX - prevPos.current.x;
        const dy = e.clientY - prevPos.current.y;

        // apply immediate rotation changes
        group.current.rotation.y += dx * 0.008; // horizontal sensitivity
        const tentativeX = group.current.rotation.x + dy * 0.006;
        group.current.rotation.x = Math.max(-0.6, Math.min(0.6, tentativeX)); // clamp tilt

        // set velocities for inertia (scaled)
        rotVelocity.current = dx * 0.04;
        tiltVelocity.current = dy * 0.02;

        // update previous
        prevPos.current = { x: e.clientX, y: e.clientY };
      }}
      onDoubleClick={(e) => {
        if (!enableInteraction) return;
        e.stopPropagation();
        // double click toggles spin
        setSpinOnClick((s) => !s);
      }}
      onClick={(e) => {
        if (!enableInteraction) return;
        e.stopPropagation();
        // single click quick nudge / toggle small spin (optional)
        // small temporary velocity for feedback
        rotVelocity.current += 0.25;
      }}
      // allow touch interactions on mobile: same handlers work with pointer events
    >
      <primitive object={scene} scale={1.35} />
    </group>
  );
}

export default function AvatarMentor({
  size = 280,           // medium default
  username = "User",
  tasks = [],
  enableInteraction = true,
}) {
  // container sits bottom-right
  const containerStyle = {
    position: "fixed",
    right: 20,
    bottom: 20,
    width: `${size}px`,
    height: `${Math.round(size * 1.12)}px`,
    zIndex: 9999,
    pointerEvents: "auto", // allow pointer events for interactions
    touchAction: "none",   // helps with drag on touch devices
  };

  const canvasStyle = {
    width: "100%",
    height: "100%",
    display: "block",
  };

  return (
    <div style={containerStyle} aria-hidden={false}>
      <div style={{ position: "absolute", right: 0, bottom: 0, width: "100%", height: "100%" }}>
        <Canvas style={canvasStyle} camera={{ position: [0, 2.6, 6], fov: 32 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 2, 2]} intensity={0.9} />
          <Suspense fallback={null}>
            <AvatarModel url="/keshav-avatar.glb" enableInteraction={enableInteraction} />
          </Suspense>
          {/* OrbitControls can be enabled for dev, but keep disabled in production UI */}
          {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
        </Canvas>
      </div>
    </div>
  );
}
