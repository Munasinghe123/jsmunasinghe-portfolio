import { Canvas } from "@react-three/fiber";
import { Model } from "./JbroTwo";

const HeroAvatar = () => {
  return (
    <Canvas>
      <ambientLight />
      <directionalLight position={[-2, 0, 3]} intensity={3} color={"#FFFFFF"}/>
      <directionalLight position={[2, 0, 3]} intensity={3}  />

      <group scale={3} position={[0, -4, 0]}>
  <Model />
</group>

    </Canvas>
  );
};

export default HeroAvatar;

