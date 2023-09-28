window.document.title = "Three.js - 3d text"

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"

THREE.ColorManagement.enabled = false;


//! SCENE
const canvas = document.querySelector(".webgl")
const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

//! TEXTURE
const textureLoader = new THREE.TextureLoader();


//! FONTS
const fontLoader = new FontLoader()

fontLoader.load("fonts/helvetiker_regular.typeface.json", (font)=>{
  const textGeometry = new TextGeometry("Hi Wubit!", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4
  })

  // * Centering the geometry short way
  textGeometry.center()

  // * Centering the geometry LONG WAY
  // textGeometry.computeBoundingBox()
  // textGeometry.translate(
  //   - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   - (textGeometry.boundingBox.max.z - 0.03) * 0.5,
  //   // textGeometry.boundingBox.max.x /-2,
  //   // textGeometry.boundingBox.max.y /-2,
  //   // textGeometry.boundingBox.max.z /-2,
  // )
  const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true })
  const text = new THREE.Mesh(textGeometry, textMaterial)
  scene.add(text)
})

//! OBJECTS
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial()
)
// scene.add(cube)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Fullscreen
window.addEventListener("dblclick", ()=>{
  if(!document.fullscreenElement){
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})
//resize function
window.addEventListener("resize", ()=>{
  
  //Update Size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  //Update the renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

//!     CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 1, 1000)
camera.position.set(1,1,4)
scene.add(camera)


//!     CONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true

//!     RENDERER
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // Update objects
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()