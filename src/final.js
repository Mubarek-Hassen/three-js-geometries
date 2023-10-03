import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"

THREE.ColorManagement.enabled = false

//! CANVAS
const canvas = document.querySelector(".webgl")

//! SCENE
const scene = new THREE.Scene()

//! GROUP
const group = new THREE.Group()
scene.add(group)

const group2 = new THREE.Group()
scene.add(group2)
//! TEXTURE
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load("/textures/matcaps/8.png")

//! MATERIAL
const material = new THREE.MeshMatcapMaterial()
material.matcap = matcapTexture

//! FONT
const fontLoader = new FontLoader()

fontLoader.load("fonts/helvetiker_regular.typeface.json", (font)=>{
  const textGeometry = new TextGeometry("Hello DevMountain!", {
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

  textGeometry.center()

  const text = new THREE.Mesh(textGeometry, material)
  group2.add(text)

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

  for(let i=0; i < 100; i++){
    
    const donut = new THREE.Mesh(donutGeometry, material)
    donut.position.x = (Math.random() - 0.5) * 20
    donut.position.y = (Math.random() - 0.5) * 20
    donut.position.z = (Math.random() - 0.5) * 20

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    donut.scale.set(scale, scale, scale)

    scene.add(donut)
  }
})

//! SIZE
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//! FLOATING OBJECT
const octahedronGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
const octa = new THREE.Mesh(octahedronGeometry, material)
group.add(octa)

//! CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000)
camera.position.set(0,-2,9)
scene.add(camera)

// ! CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// * FULL SCREEN
const fullScreen =()=>{
  if(!document.fullscreenElement){
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
window.addEventListener("dblclick", fullScreen)

// * RESIZE 
window.addEventListener("resize", ()=>{
  // UPDATE THE SIZES OBJECT
  sizes.width = window.innerWidth
  sizes.height= window.innerHeight

  // UPDATE THE CAMERA 
  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()

  // UPDATE THE RENDERER
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min( window.devicePixelRatio, 2 ))
})

//! Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // Update objects
    group.position.y = Math.sin(elapsedTime) * Math.PI
    group.position.x = Math.cos(elapsedTime) * Math.PI * 2
    group.rotation.y = elapsedTime
    group2.rotation.y = Math.cos(elapsedTime)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
