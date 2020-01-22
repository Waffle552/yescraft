THREE = require('three')
class mouse {
    constructor(renderer, mesh, sensitivity) {
        this.sense = sensitivity
        this.mesh = mesh
        this.renderer = renderer.domElement
        var uDRot = 0
        var yRot = 0

        this.renderer.addEventListener('mousemove', event => {
            yRot += (event.movementX * this.sense)
            uDRot += (event.movementY * this.sense)

            var quaternionY = new THREE.Quaternion()
            var quaternionUD = new THREE.Quaternion()
            quaternionY.setFromAxisAngle(new THREE.Vector3(0, -1, 0), THREE.Math.degToRad(yRot))
            quaternionUD.setFromAxisAngle(new THREE.Vector3(-1, 0, 0), THREE.Math.degToRad(uDRot))
            var quaternion = quaternionY.multiply(quaternionUD)

            this.mesh.rotation.setFromQuaternion(quaternion)
            mesh.updateProjectionMatrix()
        })
    }
}

class wasd {
    constructor(mesh, speed) {
        this.w = false
        this.a = false
        this.s = false
        this.d = false
        this.mesh = mesh
        this.speed = speed

        // W
        document.addEventListener('keydown', event => {
            if (event.keyCode === 87) {
                this.w = true
            }
            if (event.keyCode === 65) {
                this.a = true
            }
            if (event.keyCode === 83) {
                this.s = true
            }
            if (event.keyCode === 68) {
                this.d = true
            }
        })
        document.addEventListener('keyup', event => {
            if (event.keyCode === 87) {
                this.w = false
            }
            if (event.keyCode === 65) {
                this.a = false
            }
            if (event.keyCode === 83) {
                this.s = false
            }
            if (event.keyCode === 68) {
                this.d = false
            }
        })
    }
    run(delta) {
        let mesh = this.mesh
        let speed = this.speed
        if (this.w) {
            mesh.position.z -= Math.cos(mesh.rotation.y) * delta * speed
            mesh.position.x -= Math.sin(mesh.rotation.y) * delta * speed
        }
        if (this.a) {
            mesh.position.z -= Math.cos(mesh.rotation.y + THREE.Math.degToRad(90)) * delta * speed
            mesh.position.x -= Math.sin(mesh.rotation.y + THREE.Math.degToRad(90)) * delta * speed
        }
        if (this.s) {
            mesh.position.z += Math.cos(mesh.rotation.y) * delta * speed
            mesh.position.x += Math.sin(mesh.rotation.y) * delta * speed
        }
        if (this.d) {
            mesh.position.z -= Math.cos(mesh.rotation.y - THREE.Math.degToRad(90)) * delta * speed
            mesh.position.x -= Math.sin(mesh.rotation.y - THREE.Math.degToRad(90)) * delta * speed
        }
    }
}

module.exports = {
    'mouse': mouse,
    'wasd': wasd
}