class block {

    constructor(color, {x, y, z}){
        this.geometry = new window.THREE.BoxGeometry( 1, 1, 1 )
        this.material = new window.THREE.MeshPhongMaterial( { 'color': color } )
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        window.scene.add(this.mesh)
        this.mesh.position.x = x
        this.mesh.position.y = y
        this.mesh.position.z = z
        this.stationary = false //if true object will not move on screen with world
        this.position = new THREE.Vector3( x, y, z)
    }
}
export default block