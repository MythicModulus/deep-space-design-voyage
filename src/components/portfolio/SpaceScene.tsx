import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh, Points } from "three";

function Starfield() {
  const stars = useRef<Points>(null);

  useFrame((state, delta) => {
    if (!stars.current) return;
    stars.current.rotation.y += delta * 0.012;
    stars.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.055) * 0.035;
  });

  return (
    <>
      <Sparkles
        ref={stars}
        count={1500}
        scale={[34, 24, 24]}
        size={1.55}
        speed={0.12}
        opacity={0.52}
        color="#d9efff"
      />
      <Sparkles
        count={170}
        scale={[18, 12, 12]}
        size={3.2}
        speed={0.2}
        opacity={0.42}
        color="#83b8ff"
      />
    </>
  );
}

function Core() {
  const body = useRef<Mesh>(null);
  const aura = useRef<Mesh>(null);
  const orbit = useRef<Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const pointer = state.pointer;
    if (body.current) {
      body.current.rotation.y += delta * 0.18;
      body.current.rotation.x = Math.sin(t * 0.3) * 0.12 + pointer.y * 0.08;
      body.current.rotation.z = pointer.x * 0.1;
      body.current.scale.setScalar(1 + Math.sin(t * 1.15) * 0.018);
    }
    if (aura.current) {
      aura.current.rotation.y -= delta * 0.07;
      aura.current.scale.setScalar(1 + Math.sin(t * 0.55) * 0.035);
    }
    if (orbit.current) {
      orbit.current.rotation.z += delta * 0.08;
      orbit.current.rotation.x = 0.8 + pointer.y * 0.12;
      orbit.current.rotation.y = pointer.x * 0.15;
    }
    state.camera.position.x += (pointer.x * 0.32 - state.camera.position.x) * 0.012;
    state.camera.position.y += (pointer.y * 0.2 - state.camera.position.y) * 0.012;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      <Float speed={1.05} rotationIntensity={0.12} floatIntensity={0.18}>
        <mesh ref={body}>
          <icosahedronGeometry args={[1.04, 5]} />
          <meshPhysicalMaterial
            color="#d9efff"
            emissive="#527ebd"
            emissiveIntensity={0.46}
            roughness={0.19}
            metalness={0.72}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>
        <mesh ref={aura} scale={1.25}>
          <icosahedronGeometry args={[1.04, 2]} />
          <meshBasicMaterial color="#69adff" wireframe transparent opacity={0.14} />
        </mesh>
        <group ref={orbit}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.48, 0.012, 8, 160]} />
            <meshBasicMaterial color="#c9e6ff" transparent opacity={0.6} />
          </mesh>
          <mesh position={[1.48, 0, 0]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color="#f1fbff" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export function SpaceScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
      }}
      aria-label="An animated, luminous AI core floating in a field of stars"
    >
      <ambientLight intensity={1.1} />
      <pointLight position={[3, 2, 4]} intensity={22} color="#b7ddff" />
      <pointLight position={[-3, -2, -1]} intensity={12} color="#648eff" />
      <Starfield />
      <Core />
    </Canvas>
  );
}