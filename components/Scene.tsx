"use client";

import { Canvas, useThree, extend, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo, useEffect } from "react";
import { OrbitControls, Stars, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";
import InteractiveSphere from "./InteractiveSphere";

// Create a simple nebula component for distant space effects
function SpaceBackground() {
  const groupRef = useRef<Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  // Handle window resize for shader resolution
  useEffect(() => {
    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.resolution.value.set(
          window.innerWidth,
          window.innerHeight
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create particles for subtle movement in background
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
    // Update the time uniform for animated shader effects
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  // Create a custom shader material for the space background
  const spaceMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        void main() {
          vec2 pos = vUv * 15.0;
          float brightness = random(floor(pos)) * 0.1;
          vec3 baseColor = vec3(0.05, 0.05, 0.15); // Very dark blue base
          vec3 nebulaPurple = vec3(0.2, 0.05, 0.3) * (sin(vUv.x * 4.0 + time * 0.1) * 0.5 + 0.5) * 0.1;
          vec3 nebulaBlue = vec3(0.05, 0.1, 0.3) * (cos(vUv.y * 5.0 + time * 0.05) * 0.5 + 0.5) * 0.1;
          
          gl_FragColor = vec4(baseColor + nebulaPurple + nebulaBlue + brightness, 1.0);
        }
      `,
      side: THREE.BackSide,
    });
  }, []);

  // Store reference to material for animations
  useEffect(() => {
    materialRef.current = spaceMaterial;
  }, [spaceMaterial]);

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[40, 32, 32]} />
        <primitive object={spaceMaterial} attach="material" />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <fog attach="fog" args={["#050816", 5, 18]} />

      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <Suspense fallback={null}>
        <SpaceBackground />
        <InteractiveSphere />

        {/* Add some sparkles for distant galaxies effect */}
        <Sparkles
          count={100}
          scale={30}
          size={20}
          speed={0.2}
          opacity={0.2}
          color="#8860d0"
        />
      </Suspense>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={20}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
}
