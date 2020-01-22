// This file is where the game starts
const THREE = require('three')
window.THREE = THREE
import prefab from './prefabs/prefabs.js' // Importing pre made objects
import * as movement from './js/movement.js'
import fullscreen from './js/fullscreen.js'

var scene = new THREE.Scene();
window.scene = scene
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var cube = new prefab.block("#fff", { x: 0, y: 0, z: 0 })
var cube2 = new prefab.block("#FF5733", { x: 1, y: 1, z: 1 })
cube.mesh.position.z = -5
cube2.mesh.position.z = -5
var runtime = new THREE.Clock()
var light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(-1, 2, 4);
scene.add(light);
window.ingame = true

new fullscreen(renderer, function () {
    console.log('exit fullscreen')
})

var mouseMovement = new movement.mouse(renderer, camera, 1)
var wasd = new movement.wasd(camera, 1)

window.resizeRendererToDisplaySize = function (renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function animate() {
    if (ingame) {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        let delta = runtime.getDelta()
        wasd.run(delta)
    }
}
animate();