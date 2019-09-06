const FACE_COLORS = [
    [1.0,  1.0,  1.0,  1.0],    // Front face: white
    [1.0,  0.0,  0.0,  1.0],    // Back face: red
    [0.0,  1.0,  0.0,  1.0],    // Top face: green
    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    [1.0,  0.0,  1.0,  1.0],    // Left face: purple
];



export const setColors = (gl) => {
    var colors = [];

    for (var j = 0; j < FACE_COLORS.length; j++) {
        const c = FACE_COLORS[j];
        colors = colors.concat(c, c, c, c);
    }

    // each vertex (24) is going to have a specific color
    // and **note** that each RGB color is a set of 4 #'s
    // i.e. [1.0, 1.0, 1.0, 1.0]

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer
};