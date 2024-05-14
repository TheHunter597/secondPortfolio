import * as THREE from "three";
export function makeReceiveShadow(
  elements: THREE.Object3D<THREE.Object3DEventMap>[]
) {
  for (const element of elements) {
    element.receiveShadow = true;
    if (element.children.length > 0) {
      makeReceiveShadow(element.children);
    }
  }
}
export function makeCastShadow(
  elements: THREE.Object3D<THREE.Object3DEventMap>[]
) {
  for (const element of elements) {
    element.castShadow = true;
    if (element.children.length > 0) {
      makeCastShadow(element.children);
    }
  }
}
