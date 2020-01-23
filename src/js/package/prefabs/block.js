const THREE = require('three')
class block {

    /**
     * Creates a block
     * @param {*} engine game engine
     * @param {*} color 
     * @param {THREE.Vector3} location x, y, z location of object
     */
    constructor(engine, color, location){
        this.geometry = new THREE.BoxGeometry( 1, 1, 1 )
        this.material = new THREE.MeshPhongMaterial( { 'color': color } )
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        engine.scene.add(this.mesh)
        this.mesh.position.x = location.x
        this.mesh.position.y = location.y
        this.mesh.position.z = location.z
        this.stationary = false //if true object will not move on screen with world
        this.position = location
    }
    start(){
        
    }
    update(){

    }
}
export default block