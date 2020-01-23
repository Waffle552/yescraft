import engine from './js/engine/engine.js'
import * as movement from './js/package/movement.js'

function start(){
    game.world.block1 = new game.prefabs.block(game, '#ff0000', new THREE.Vector3(0,0,-5))
    game.movement = {}
    game.movement.wasd = new movement.wasd(game.camera, 1)
    game.movement.mouse = new movement.mouse(game.renderer, game.camera, 1)
    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set(-1, 2, 4)
    game.scene.add( light )

}

function update(delta){
    game.movement.wasd.run(delta)
}

var game = new engine(false, update)

start()