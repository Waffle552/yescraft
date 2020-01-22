const $ = require('jquery')

class fullscreen {
    constructor(renderer, onExit) {
        //fullscreen mode
        $(renderer.domElement).click(function () {
            renderer.domElement.requestFullscreen()
            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.domElement.requestPointerLock()
            resizeRendererToDisplaySize(renderer)
        })
        $(renderer.domElement).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
            var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            var event = state ? 'FullscreenOn' : 'FullscreenOff';
            if (event == "FullscreenOff" && onExit) {
                onExit()
                resizeRendererToDisplaySize(renderer)
            }
        });
    }
}

export default fullscreen