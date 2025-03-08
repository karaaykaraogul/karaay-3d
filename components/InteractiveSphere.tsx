"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import { useSpring, animated } from "@react-spring/three";

export default function InteractiveSphere() {
  const sphereRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0, z: 0 });
  const currentRotation = useRef({ x: 0, y: 0, z: 0 });
  const lastTime = useRef(0);

  // Adjust these parameters for smoothness
  const maxRotationAngle = 0.5; // Maximum rotation angle in radians
  const lerpFactor = 0.03; // Lower for smoother but slower transitions

  // Load moon texture
  const moonTexture = useTexture("/moon_texture.jpg");

  // Spring animation for smoother movement
  const { scale } = useSpring({
    scale: hovered ? 2.1 : 2,
    config: { mass: 1, tension: 180, friction: 20 },
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      // with consistent sensitivity regardless of window size
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    if (sphereRef.current) {
      const currentTime = state.clock.getElapsedTime();
      const deltaTime = Math.min(currentTime - lastTime.current, 0.1); // Cap delta time to avoid jumps
      lastTime.current = currentTime;

      // Time-based lerp factor for consistent movement regardless of frame rate
      const timeLerpFactor = 1 - Math.pow(1 - lerpFactor, deltaTime * 60);

      // Update target rotation based on current mouse position
      // Apply maxRotationAngle to limit the maximum rotation
      targetRotation.current = {
        x: -mousePosition.current.y * maxRotationAngle,
        y: mousePosition.current.x * maxRotationAngle,
        z: 0,
      };

      // Apply time-adjusted LERP to rotation
      currentRotation.current.x +=
        (targetRotation.current.x - currentRotation.current.x) * timeLerpFactor;
      currentRotation.current.y +=
        (targetRotation.current.y - currentRotation.current.y) * timeLerpFactor;

      // Apply the smoothed rotation
      sphereRef.current.rotation.x = currentRotation.current.x;
      sphereRef.current.rotation.y = currentRotation.current.y + 0.0005; // Subtle continuous rotation
    }
  });

  return (
    <group>
      <animated.mesh
        ref={sphereRef}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={moonTexture}
          metalness={0.1}
          roughness={0.8}
        />
      </animated.mesh>
    </group>
  );
}
