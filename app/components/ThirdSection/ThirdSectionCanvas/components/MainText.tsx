import TextCreator from "./TextCreator";

export default function MainText() {
  return (
    <group>
      <TextCreator text="Projec" position={[-7, 0, 0]} color={"#F39A9D"} />
      <TextCreator text="." position={[-3.8, 0, 0]} color={"#FFBF69"} />
      <TextCreator
        text="ts"
        position={[-3.5, 0, 0]}
        rotation={[0, 0, -Math.PI / 4]}
        color={"#EFCB68"}
      />
    </group>
  );
}
