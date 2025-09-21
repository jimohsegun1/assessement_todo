declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera, EventDispatcher, Renderer } from "three";

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement: HTMLElement);

    enableDamping: boolean;
    target: THREE.Vector3;
    update(): void;
    dispose(): void;
  }
}
