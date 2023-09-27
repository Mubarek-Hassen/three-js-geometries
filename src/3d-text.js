import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

THREE.ColorManagement.enabled = false;

//! SCENE
const canvas = document.querySelector(".webgl")
const scene = new THREE.Scene()

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial()
)
scene.add(cube)

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
camera.position.set(0,0,5)
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
    cube.rotation
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()