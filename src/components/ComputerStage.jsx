import { Canvas } from "@react-three/fiber";
import { Center, Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { MyComputer } from "./My_computer";

export default function ComputerStage() {
  return (
    <div style={{ width: "100%", height: "60vh" }}>
      <Canvas  camera={{ position: [2, 1.4, 3.2], fov: 45 }}
  gl={{ alpha: true, antialias: true }}
  style={{ background: "transparent" }}>
        
        <hemisphereLight intensity={0.6} groundColor="#222" />
        <directionalLight position={[5,6,4]} intensity={1.2} />

        <Suspense fallback={null}>
          {/* Centers the model’s bounds at the origin and normalizes pivot */}
          <Center>
            <group scale={1}>        {/* ⬅️ make it larger */}
              <MyComputer />
            </group>
          </Center>
          <Environment preset="city" intensity={0.35} />
        </Suspense>

        <OrbitControls enableDamping dampingFactor={0.08}  enableZoom={false} />
      </Canvas>
    </div>
  );
}
