// This is a global that can be updated
let squareRotation = 0;

const setVertexPositions = (gl, buffers, programInfo) => {
    const numComponents = 3;  // pull out 2 values per position
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    // TODO: why are we rebinding the buffer if we've already binded it in `initBuffers.js`
    // answer: we need to continue to bind the buffer since operations applied are to the current
    // buffer. Therefore, if we want to create new data, we'll need a new buffer and we'll need
    // to rebind it.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

    // this is telling us how to pull the data out from the attributes
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,  // in the position example, this is representative of the "3 points to dictate a coordinate"
        type,
        normalize,
        stride,
        offset,
    );

    // this turns "on" the attribute.
    // refer to this article for more info: https://webglfundamentals.org/webgl/lessons/webgl-attributes.html
    // but `vertexPosition` will be an index value that points to the attribute.
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition,
    );
};

const setVertexColors = (gl, buffers, programInfo) => {
    const numComponents = 4; // I think the #'s go from 1-4
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);

    // the `vertexAttribPointer` is dictating how we pull data out of the buffer and pass it
    // into the vertex shader.

    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor,
    );
};

const setCube = (gl, buffers, programInfo) => {
    // this might be needed to bind earlier
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
};

export const drawScene = (gl, programInfo, buffers, deltaTime) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // clear to black
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST); // enable depth testing
    gl.depthFunc(gl.LEQUAL); // near things obscure far things

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.
    const fieldOfView = 45 * Math.PI / 180; // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;

    // TODO: this is kinda strange. We are binding it... but not sure if we are doing anything with it.
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    //

    const projectionMatrix = mat4.create();

    mat4.perspective(
        projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar,
    );

    // we need a *different* matrix for the modelViewMatrix
    const modelViewMatrix = mat4.create();

    mat4.rotate(
        modelViewMatrix,
        modelViewMatrix,
        `` * 0.7,
        [0, 1, 0]
    )

    // rotation of the matrix happens here:
    mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        squareRotation * 0.7, // amount to rotate
        // ^ now represents the cube rotation.
        [0, 0, 1], // the axis to rotate
    );

    // translate a matrix:
    // a type of transformation that occurs when a figure is moved from one location to
    // another on the coordinate plane without changing its size, shape, or orientation.
    mat4.translate(
        modelViewMatrix,
        modelViewMatrix,
        [-0.0, 0.0, -6.0]
    );


    // In this case, we are now pushing the matrix inward (within the negative axis) so it's visible.
    setVertexPositions(gl, buffers, programInfo);
    setVertexColors(gl, buffers, programInfo);
    // Note that if you don't call this function, the box actually doesn't come in sight.

    // order is that we bind the buffer here
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    ///////////////////////////////
    // I believe code after this is rendering code
    ///////////////////////////////


    // after applying vertex-items:
    gl.useProgram(programInfo.program);

    // set the shader uniforms
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix,
    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix,
    );
    //
    // const offset = 0;
    //
    // // essentially the number of vertices.
    // // for our case -- a cube has 4 vertices per face
    // const vertexCount = 4;

    setCube(gl, buffers, programInfo);
    squareRotation += deltaTime



    // gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
};