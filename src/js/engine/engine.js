// This file compiles all nessisary game dependencys 
const THREE = require('three')
window.THREE = THREE
import prefab from '../package/prefabs/prefabs.js' // Importing pre made objects
import fullscreen from './fullscreen.js'

class gameEngine {
    /**
    * @param {Boolean} alwaysActive If true the game will run all of the time.
    * @param {Function} onUpdate Will run every frame.
    */
    constructor(alwaysActive, onUpdate) {
        this.prefabs = prefab
        this.onUpdate = onUpdate
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.gameActive = false
        this.world = []
        document.body.appendChild(this.renderer.domElement)
        this.time = new THREE.Clock()
        var game = this
        new fullscreen(this.renderer,
            function () {
                if (!alwaysActive) { game.gameActive = true }
                console.log('Fullscreen in')
            },
            function () {
                if (!alwaysActive) { game.gameActive = false }
                console.log('Fullscreen out')
            })
        this.update()
    }

    update() {
        let game = this
        function update() {
            
            requestAnimationFrame(update)
            if (game.gameActive) {
                game.renderer.render(game.scene, game.camera)
                let delta = game.time.getDelta()

                //run update function in game objects
                for (var i = 0; game.world.length > i; i++) {
                    game.world[i].update(delta)
                }
                if (game.onUpdate != undefined) { game.onUpdate(delta) }

            }
        }
        update()

    }
}

export default gameEngine