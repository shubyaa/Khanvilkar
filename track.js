document.addEventListener("DOMContentLoaded", function() {
    var trackingData = {
        screenWidth: screen.width,
        screenHeight: screen.height,
        userAgent: navigator.userAgent,
        deviceMemory: navigator.deviceMemory,
        webGL: getWebGLRenderer()
    };
    fetch('http://localhost:3000/track', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(trackingData)
    });
});

function getWebGLRenderer() {
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if(gl.getParameter(gl.VERSION)) {
        var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    }
    return 'Unknown WebGL Renderer';
}