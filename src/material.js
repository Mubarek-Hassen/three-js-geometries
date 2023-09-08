import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const canvas = document.querySelector(".webgl")

//!   SCENE

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1,1,1,2,2,2);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
scene.add(camera)
camera.position.set(1,1,1)

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width, sizes.height)


renderer.render(scene, camera)