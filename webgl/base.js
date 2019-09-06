

/*
A helper function that handles the loading of a shader
*/
export const loadShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    return shader;
};


/*
A helper function that takes in the vsSource and fsSource
to load in the vertex/fragment shaders

we need to get both shaders, then pass them to WebGL, compile and link them to create
the program
*/
export const initShaderProgram = (gl, vsSource, fsSource) => {
    // 1. load the shaders
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // 2. create the program given both shaders
    const shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // TODO: Q -> can we have more than 2 shaders within one shaderProgram ?
    // yes -- we'll just have to call `useProgram` to dictate which program to use for the frame.
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Failed to setup shader');
        return;
    }

    return shaderProgram;
};
