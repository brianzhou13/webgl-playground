import { CUBE_POSITIONS, positions } from './constants.js';
import { setColors } from './setColors.js';

const createPositionBuffer = (gl) => {
    // this buffer contains the information for us to create the
    // layer where we position our graphic
    // const positions = [
    //     -1.0, 1.0,
    //     1.0, 1.0,
    //     -1.0, -1.0,
    //     1.0, -1.0,
    // ];
    // const positions = CUBE_POSITIONS;
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return positionBuffer;
};

const createColorBuffer = (gl) => {
    // NOTE how it's an array of 24 elements...
    const colors = [
        1.0, 1.0, 1.0, 1.0, // white
        1.0, 0.0, 0.0, 1.0, // red
        0.0, 1.0, 0.0, 1.0, // green
        0.0, 0.0, 1.0, 1.0, // blue
    ];
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    return colorBuffer;
};

const createCubeColorBuffers = (gl) => {
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    /*
    This array defines each face as two triangles, using the
    indices into the vertex array to specify each triangle's
    position.

    As for two triangles, note that rendering usually uses
    triangles when composing its slices

    The indices array defines each face like a pair of triangles, specifying each
    triangle's vertices as an index into the cube's vertex arrays. Thus the cube
    is described as a collection of 12 triangles.
    */

    // TODO: how are these indices calculated (?) and indices of what?
    // const indices = [
    //     0, 1, 2, 0, 2, 3, //front
    //     4, 5, 6, 4, 6, 7, // back
    //     8, 9, 10, 8, 10, 11, // top
    //     12, 13, 14, 12, 14, 15, // bottom
    //     16, 17, 18, 16, 18, 19, // right
    //     20, 21, 22, 20, 22, 23,  // left
    // ];
      const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
  ];

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
    return indexBuffer;
}

export const initBuffers = (gl) => {
    return {
        position: createPositionBuffer(gl),  // Float32Array that will be drawn
        color: setColors(gl), // Float32Array
        indices: createCubeColorBuffers(gl), // Uint8Array
    };
};