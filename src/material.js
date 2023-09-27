import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from "lil-gui"
THREE.ColorManagement.enabled = false


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// ! Debug Control - lil-gui
const gui = new dat.GUI()



//! TEXTURES //

const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load("/textures/door/color.jpg")
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg")
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg")
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg")
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg")
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg")
const doorAmbientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg")

const matcapTexture = textureLoader.load("/textures/matcaps/1.png")
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg")

// ! Environment Map
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
])

// ! OBJECTS || MESHES
//  * Mesh Basic Material
// const material = new THREE.MeshBasicMaterial();
// material.transparent = true;
// material.alphaMap = doorAlphaTexture
// material.map = doorColorTexture
// material.color = new THREE.Color("peru")
// material.side = THREE.DoubleSide

//  * Mesh Normal Material
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true;


//  * Mesh Matcap Material
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

//  * Mesh Depth Material
// const material = new THREE.MeshDepthMaterial()

//  * Mesh Lambert Material
// const material = new THREE.MeshLambertMaterial()

//  * Mesh Phong Material
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff)

// *  Mesh Toon Material
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture;
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false;

// * MESH STANDARD MATERIAL *

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0
// material.roughness = 1
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// * MESH STANDARD MATERIAL
// const material = new THREE.MeshPhysicalMaterial()

// ! Environment Map



const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture

// Debug Controls
gui.add(material, "metalness").min(0).max(1).step(0.0001)
gui.add(material, "roughness").min(0).max(1).step(0.0001)
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001)
gui.add(material, "displacementScale").min(0.05).max(1).step(0.0001)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64,64),
  material
)
sphere.position.x = -1.5
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1,1, 100, 100),
  material
)
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const light = new THREE.PointLight(0xffffff, 100);
light.position.x = 5;
light.position.z = 5;


scene.add(light);
const hlp = new THREE.PointLightHelper(light)
scene.add(hlp)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // sphere.rotation.x = 0.15 * elapsedTime
    // plane.rotation.x = 0.15 * elapsedTime
    // torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()