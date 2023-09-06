import * as THREE from "three";
// import * as dat from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
/** TEXTURE 1 */
// NATIVE JS TEXTURE
// const image = new Image()
// const texture = new THREE.Texture(image)
// image.onload =()=>{
//   texture.needsUpdate = true
// }
// image.src = "/texture.jpeg"
// Then update the material by adding map key and texture value.

//! LOADING MANAGER
const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () =>{
//   console.log("onStart")
// }
// loadingManager.onLoad = () =>{
//   console.log("onLoad")
// }
// loadingManager.onProgress = () =>{
//   console.log("onProgress")
// }
// loadingManager.onError = () =>{
//   console.log("onError")
// }
/**
//! TEXTURE 2
The second and easier way to load texture
using
//* TEXTURE LOADER
 */

// TEXTURES EXAMPLES
const textureLoader = new THREE.TextureLoader(loadingManager);

const colorTexture = textureLoader.load("/textures/door/color.jpg");
//!Repeat Texture
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// //! OFFSET TEXTURE
// colorTexture.offset.y = 0.5
// colorTexture.offset.x = 0.5

//! ROTATION - TEXTURE
// colorTexture.rotation = Math.PI * 0.25

// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

const canvas = document.querySelector(".webgl");

//* SCENE
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });

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


// const alphaTexture = textureLoader.load("/textures/door/alpha.jpg")

// const heightTexture = textureLoader.load("/textures/door/height.jpg")

// const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg")

// const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg")

// const normalTexture = textureLoader.load("/textures/door/normal.jpg")

// const ambientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg")