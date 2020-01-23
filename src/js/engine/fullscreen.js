const $ = require('jquery')

class fullscreen {
    /**
     * Will put game into fullscreen mode and resize
     * @param {THREE.Renderer} renderer 
     * @param {Function} eventIn Will run whenever app goes into full screen mode.
     * @param {Function} eventOut Will run whenever app goes out of full screen mode.
     */
    constructor(renderer, eventIn, eventOut) {
        //fullscreen mode
        $(renderer.domElement).click(function () {
            renderer.domElement.requestFullscreen()
            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.domElement.requestPointerLock()
            const canvas = renderer.domElement;
            const pixelRatio = window.devicePixelRatio;
            const width = canvas.clientWidth * pixelRatio | 0;
            const height = canvas.clientHeight * pixelRatio | 0;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (eventIn) {eventIn()}
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        })
        $(renderer.domElement).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
            var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            var event = state ? 'FullscreenOn' : 'FullscreenOff';
            if (event == "FullscreenOff") {
                if (eventOut) { eventOut() }
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
        });
    }
}

export default fullscreen