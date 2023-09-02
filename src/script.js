import * as THREE from "three";
// import * as dat from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const image = new Image()

const texture = new THREE.Texture(image)

image.onload =()=>{
  texture.needsUpdate = true
}
image.src = "/texture.jpeg"

const canvas = document.querySelector(".webgl");

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

const material = new THREE.MeshBasicMaterial({ map: texture });

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);


// DEBUG ------ DAT GUI
// const gui = new dat.GUI();
// gui.add(mesh.position, "y", -3, 3, 0.01)
// const debugObj = {
//   color: "blue",
//   spin: () => {
//     gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
//   },
// };
// gui.addColor(debugObj, "color").onChange(() => {
//   material.color.set(debugObj.color);
// });
// //CHAINing
// gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
// gui.add(mesh, "visible");
// gui.add(material, "wireframe");
// gui.add(debugObj, "spin");


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// RESIZE
window.addEventListener("resize", () => {
  // UPDATE THE SIZE
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //UPDATE THE CAMERA
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// FULLSCREEN MODE
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);

let clock = new THREE.Clock();

const tick = () => {
  let elapsedTime = clock.getElapsedTime();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
