function setAttribPointers(obj) {
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.nBuffer);
    gl.vertexAttribPointer(obj.vNormal, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, obj.pBuffer);
    gl.vertexAttribPointer(obj.vPosition, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, obj.cBuffer);
    gl.vertexAttribPointer(obj.vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, obj.tBuffer);
    gl.vertexAttribPointer(obj.vTexCoord, 2, gl.FLOAT, false, 0, 0);
}

function setBuffers(obj, program) {
    obj.nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj.normalsArray), gl.STATIC_DRAW);

    obj.vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(obj.vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj.vNormal);

    obj.pBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.pBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj.pointsArray), gl.STATIC_DRAW);

    obj.vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(obj.vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj.vPosition);

    obj.cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj.colorsArray), gl.STATIC_DRAW);

    obj.vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(obj.vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj.vColor);

    obj.tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj.texCoordsArray), gl.STATIC_DRAW);

    obj.vTexCoord = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(obj.vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(obj.vTexCoord);
}

function AddInAttribArrays(obj, v) {
    obj.pointsArray.push(v.position);
    obj.normalsArray.push(v.normal);
    obj.colorsArray.push(v.colour);
    obj.texCoordsArray.push(v.texCoord);
}
// --------------- CUBE TEXTURE ONE SIDE --------------
OneSidedCube = {};
OneSidedCube.numVertices = 36;

OneSidedCube.pointsArray = [];
OneSidedCube.normalsArray = [];
OneSidedCube.colorsArray = [];
OneSidedCube.texCoordsArray = [];

const cubeVertices = [
    1, 1, 1,    -1, 1, 1,   -1, -1, 1,
    -1, -1, 1,  1, -1, 1,  1, 1, 1,   

    1, 1, 1, 1, -1, 1, 1, -1, -1,    
    1, -1, -1, 1, 1, -1, 1, 1, 1,   

    1, 1, 1, 1, 1, -1, -1, 1, -1,   
    -1, 1, -1, -1, 1, 1, 1, 1, 1,  

    -1, 1, 1, -1, 1, -1, -1, -1, -1,    
    -1, -1, -1, -1, -1, 1, -1, 1, 1,  

    -1, -1, -1, 1, -1, -1, 1, -1, 1,  
    1, -1, 1, -1, -1, 1, -1, -1, -1,     

    1, -1, -1, -1, -1, -1, -1, 1, -1,  
    -1, 1, -1, 1, 1, -1, 1, -1, -1
]; 

const cubeNormals = [
    0, 0, 1, 0, 0, 1, 0, 0, 1,
    0, 0, 1, 0, 0, 1, 0, 0, 1, 

    1, 0, 0, 1, 0, 0, 1, 0, 0, 
    1, 0, 0, 1, 0, 0, 1, 0, 0,  

    0, 1, 0, 0, 1, 0, 0, 1, 0, 
    0, 1, 0, 0, 1, 0, 0, 1, 0, 

    -1, 0, 0, -1, 0, 0, -1, 0, 0,  
    -1, 0, 0, -1, 0, 0, -1, 0, 0, 

    0, -1, 0, 0, -1, 0, 0, -1, 0,   
    0, -1, 0, 0, -1, 0, 0, -1, 0,   

    0, 0, -1, 0, 0, -1, 0, 0, -1,   
    0, 0, -1, 0, 0, -1, 0, 0, -1
]; 

const cubeColours = [
    1, 0, 0, 1, 0, 0, 1, 0, 0,  
    1, 0, 0, 1, 0, 0, 1, 0, 0,

    0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 

    0, 1, 0, 0, 1, 0, 0, 1, 0,   
    0, 1, 0, 0, 1, 0, 0, 1, 0,  

    1, 1, 0, 1, 1, 0, 1, 1, 0, 
    1, 1, 0, 1, 1, 0, 1, 1, 0, 

    0, 1, 1, 0, 1, 1, 0, 1, 1,  
    0, 1, 1, 0, 1, 1, 0, 1, 1, 

    0, 0, 1, 0, 0, 1, 0, 0, 1,
    0, 0, 1, 0, 0, 1, 0, 0, 1
];  

const cubeTexures = [
    1, 1,  0, 1,  0, 0,  
    0, 0,  1, 0,  1, 1,   

    0, 1,  0, 0,  1, 0,    
    1, 0,  1, 1,  0, 1,   

    1, 0, 1, 1, 0, 1,     
    0, 1, 0, 0, 1, 0,   

    1, 1, 0, 1, 0, 0,    
    0, 0, 1, 0, 1, 1,   

    0, 1, 0, 0, 1, 0,    
    1, 0, 1, 1, 0, 1,     

    0, 0, 1, 0, 1, 1,   
    1, 1, 0, 1, 0, 0
];   

const cubeTexuresSingleFace = [
    1, 1,  0, 1,  0, 0,  
    0, 0,  1, 0,  1, 1,   
];  

OneSidedCube.init = function (program) {
    let count = 0;
    let texCount = 0;
    for (let i = 0; i < cubeVertices.length; i++) {
        this.pointsArray.push(vec4(cubeVertices[count], cubeVertices[count + 1], cubeVertices[count + 2], 1.0));
        this.normalsArray.push(vec3(cubeNormals[count], cubeNormals[count + 1], cubeNormals[count + 2]));
        this.colorsArray.push(vec4(cubeColours[count], cubeColours[count + 1], cubeColours[count + 2], 1.0));
        this.texCoordsArray.push(cubeTexuresSingleFace[texCount], cubeTexuresSingleFace[texCount + 1]);

        count = count + 3;
        texCount = texCount + 2;
    }
    setBuffers(this, program);
}

OneSidedCube.draw = function () {
    setAttribPointers(this);
    gl.frontFace(gl.CCW);
    gl.drawArrays(gl.TRIANGLES, 0, 36);
}

// --------------- CUBE --------------
Cube = {};
Cube.numVertices = 36;

Cube.pointsArray = [];
Cube.normalsArray = [];
Cube.colorsArray = [];
Cube.texCoordsArray = [];

Cube.init = function (program) {
    let count = 0;
    let texCount = 0;
    for (let i = 0; i < cubeVertices.length; i++) {
        this.pointsArray.push(vec4(cubeVertices[count], cubeVertices[count + 1], cubeVertices[count + 2], 1.0));
        this.normalsArray.push(vec3(cubeNormals[count], cubeNormals[count + 1], cubeNormals[count + 2]));
        this.colorsArray.push(vec4(cubeColours[count], cubeColours[count + 1], cubeColours[count + 2], 1.0));
        this.texCoordsArray.push(cubeTexures[texCount], cubeTexures[texCount + 1]);

        count = count + 3;
        texCount = texCount + 2;
    }
    setBuffers(this, program);
}

Cube.draw = function () {
    setAttribPointers(this);
    gl.frontFace(gl.CCW);
    gl.drawArrays(gl.TRIANGLES, 0, 36);
}

// -------------- Cylinder --------------
Cylinder = {};

Cylinder.pointsArray = [];
Cylinder.normalsArray = [];
Cylinder.colorsArray = [];
Cylinder.texCoordsArray = [];

Cylinder.getVertex = function (u, v) {
    const vd = {};
    vd.position = vec4(0.5 * Math.cos(u * 2 * Math.PI), 0.5 * Math.sin(u * 2 * Math.PI), v - 0.5, 1.0);
    vd.normal = vec3(Math.cos(u * 2 * Math.PI), Math.sin(u * 2 * Math.PI), 0.0);
    vd.colour = vec4(u, v, 0.0, 1.0);
    vd.texCoord = vec2(u, v);

    return vd;
}

Cylinder.init = function (n, program) {
    this.n = n;
    if (this.n < 1) return;

    const du = 1.0 / this.n;
    const dv = du;

    for (let u = 0; u < 1.0; u += du) {
        for (let v = 0; v < 1.0; v += dv) {

            const vd1 = this.getVertex(u, v);
            const vd2 = this.getVertex(u + du, v);
            const vd3 = this.getVertex(u + du, v + dv);
            const vd4 = this.getVertex(u, v + dv);

            AddInAttribArrays(this, vd1);
            AddInAttribArrays(this, vd2);
            AddInAttribArrays(this, vd3);

            AddInAttribArrays(this, vd3);
            AddInAttribArrays(this, vd4);
            AddInAttribArrays(this, vd1);
        }
    }
    setBuffers(this, program);
}

Cylinder.draw = function () {
    gl.frontFace(gl.CCW);
    setAttribPointers(this);
    gl.drawArrays(gl.TRIANGLES, 0, this.n * this.n * 6);
}

// ------------- CONE --------------------------------
Cone = {};

Cone.pointsArray = [];
Cone.normalsArray = [];
Cone.colorsArray = [];
Cone.texCoordsArray = [];

Cone.getVertex = function (u, v) {
    const radius = 1.0 - v;
    const vd = {};
    vd.position = vec4(radius * Math.cos(u * 2 * Math.PI), radius * Math.sin(u * 2 * Math.PI), v - 0.5, 1.0);
    const ntemp = vec3(Math.cos(u * 2 * Math.PI), Math.sin(u * 2 * Math.PI), 1.0);
    vd.normal = normalize(ntemp);
    vd.colour = vec4(u, v, 0.0, 1.0);
    vd.texCoord = vec2(u, v);

    return vd;
}


Cone.init = function (n, program) {
    this.n = n;
    if (this.n < 1) return;

    const du = 1.0 / this.n;
    const dv = du;

    for (let u = 0; u < 1.0; u += du) {
        for (let v = 0; v < 1.0; v += dv) {

            const vd1 = this.getVertex(u, v);
            const vd2 = this.getVertex(u + du, v);
            const vd3 = this.getVertex(u + du, v + dv);
            const vd4 = this.getVertex(u, v + dv);

            AddInAttribArrays(this, vd1);
            AddInAttribArrays(this, vd2);
            AddInAttribArrays(this, vd3);

            AddInAttribArrays(this, vd3);
            AddInAttribArrays(this, vd4);
            AddInAttribArrays(this, vd1);
        }
    }
    setBuffers(this, program);
}

Cone.draw = function () {
    gl.frontFace(gl.CCW);
    setAttribPointers(this);
    gl.drawArrays(gl.TRIANGLES, 0, this.n * this.n * 6);
}

// ------------ SPHERE ------------------------
Sphere = {};

Sphere.pointsArray = [];
Sphere.normalsArray = [];
Sphere.colorsArray = [];
Sphere.texCoordsArray = [];

Sphere.getVertex = function (uu, vv) {
    const vd = {};
    const u = uu * Math.PI;
    const v = vv * 2 * Math.PI;

    vd.position = vec4(Math.cos(u) * Math.sin(v),
        Math.sin(u) * Math.sin(v),
        Math.cos(v),
        1.0);
    vd.normal = vec3(vd.position[0], vd.position[1], vd.position[2]);
    vd.colour = vec4(uu, vv, 0.0, 1.0);
    vd.texCoord = vec2(uu, vv);

    return vd;
}

function flip(vd1, vd2, vd3) {
    const an = scalev(1.0 / 3.0, add(vd1.normal, add(vd2.normal, vd3.normal)));

    const va = subtract(vd2.normal, vd1.normal);
    const vb = subtract(vd3.normal, vd1.normal);
    const tn = cross(vb, va);
    if (dot(an, tn) < 0.0) return true;

    return false;
}

Sphere.init = function (n, program) {
    this.n = n;
    if (this.n < 1) return;

    const du = 1.0 / this.n;
    const dv = du;

    for (let u = 0; u < 1.0; u += du) {
        for (let v = 0; v < 1.0; v += dv) {

            const vd1 = this.getVertex(u, v);
            const vd2 = this.getVertex(u + du, v);
            const vd3 = this.getVertex(u + du, v + dv);
            const vd4 = this.getVertex(u, v + dv);

            if (!flip(vd1, vd2, vd3)) {
                AddInAttribArrays(this, vd1)
                AddInAttribArrays(this, vd2);
                AddInAttribArrays(this, vd3);
            } else {
                AddInAttribArrays(this, vd1)
                AddInAttribArrays(this, vd3);
                AddInAttribArrays(this, vd2);
            }

            if (!flip(vd3, vd4, vd1)) {
                AddInAttribArrays(this, vd3)
                AddInAttribArrays(this, vd4);
                AddInAttribArrays(this, vd1);
            } else {
                AddInAttribArrays(this, vd3)
                AddInAttribArrays(this, vd1);
                AddInAttribArrays(this, vd4);
            }
        }
    }
    setBuffers(this, program);
}

Sphere.draw = function () {
    gl.frontFace(gl.CW);
    setAttribPointers(this);
    gl.drawArrays(gl.TRIANGLES, 0, this.n * this.n * 6);
}

// ------------ DONUT ------------------------
Donut = {};

Donut.pointsArray = [];
Donut.normalsArray = [];
Donut.colorsArray = [];
Donut.texCoordsArray = [];

Donut.getVertex = function (uu, vv) {
    const vd = {};
    const u = uu * 2 * Math.PI;
    const v = vv * 2 * Math.PI;

    vd.position = vec4( (2 + 1 * Math.cos(v)) * Math.cos(u),
                        (2 + 1 * Math.cos(v)) * Math.sin(u),
                        1 * Math.sin(v),
                        1.0);
    vd.normal = vec3(vd.position[0], vd.position[1], vd.position[2]);
    vd.colour = vec4(uu, vv, 0.0, 1.0);
    vd.texCoord = vec2(uu, vv);

    return vd;
}

function flip(vd1, vd2, vd3) {
    const an = scalev(1.0 / 3.0, add(vd1.normal, add(vd2.normal, vd3.normal)));

    const va = subtract(vd2.normal, vd1.normal);
    const vb = subtract(vd3.normal, vd1.normal);
    const tn = cross(vb, va);
    if (dot(an, tn) < 0.0) return true;

    return false;
}

Donut.init = function (n, program) {
    this.n = n;
    if (this.n < 1) return;

    const du = 1.0 / this.n;
    const dv = du;

    for (let u = 0; u < 1.0; u += du) {
        for (let v = 0; v < 1.0; v += dv) {

            const vd1 = this.getVertex(u, v);
            const vd2 = this.getVertex(u + du, v);
            const vd3 = this.getVertex(u + du, v + dv);
            const vd4 = this.getVertex(u, v + dv);

            if (!flip(vd1, vd2, vd3)) {
                AddInAttribArrays(this, vd1)
                AddInAttribArrays(this, vd2);
                AddInAttribArrays(this, vd3);
            } else {
                AddInAttribArrays(this, vd1)
                AddInAttribArrays(this, vd3);
                AddInAttribArrays(this, vd2);
            }

            if (!flip(vd3, vd4, vd1)) {
                AddInAttribArrays(this, vd3)
                AddInAttribArrays(this, vd4);
                AddInAttribArrays(this, vd1);
            } else {
                AddInAttribArrays(this, vd3)
                AddInAttribArrays(this, vd1);
                AddInAttribArrays(this, vd4);
            }
        }
    }
    setBuffers(this, program);
}

Donut.draw = function () {
    gl.frontFace(gl.CW);
    setAttribPointers(this);
    gl.drawArrays(gl.TRIANGLES, 0, this.n * this.n * 6);
}

Prism = {};

Prism.top = {};

Prism.top.pointsArray = [];
Prism.top.normalsArray = [];
Prism.top.colorsArray = [];
Prism.top.texCoordsArray = [];

Prism.bottom = {};

Prism.bottom.pointsArray = [];
Prism.bottom.normalsArray = [];
Prism.bottom.colorsArray = [];
Prism.bottom.texCoordsArray = [];

Prism.sides = {};

Prism.sides.pointsArray = [];
Prism.sides.normalsArray = [];
Prism.sides.colorsArray = [];
Prism.sides.texCoordsArray = [];

Prism.numSides;

Prism.getVertexBaseCenter = function (h) {
    const vd = {};

    vd.position = vec4(0.0,0.0,h,1.0);
    vd.normal = vec3(0,0,-1);
    vd.color = vec4(1.0, 1.0, 1.0, 1.0);
    vd.texCoord = vec2(vd.position[0]/4 +0.5,vd.position[1]/4+0.5);

    if( h != 0){
        vd.normal = vec3(0,0,1);
    }

    return vd;
}

Prism.getVertexBase = function (i,h) {
    const vd = {};

    const angle = ((2 * Math.PI) / this.numSides) * i ;
    const cos = Math.round(Math.cos(angle) * 100) / 100;
    const sin = Math.round(Math.sin(angle) * 100) / 100;

    vd.position = vec4( 2*cos, 2*sin, h , 1.0);
    vd.normal = vec3(0,0,-1);
    vd.color = vec4(1.0, 1.0, 1.0, 1.0);
    vd.texCoord = vec2(vd.position[0]/4 +0.5,vd.position[1]/4+0.5);

    if( h != 0){
        vd.normal = vec3(0,0,1);
    }
    return vd;
}

Prism.getVertexSides = function (u,v) {
    const vd = {};

    vd.position = vec4(2 * Math.cos(u * 2 * Math.PI), 2 * Math.sin(u * 2 * Math.PI), v*2 , 1.0);
    vd.normal = vec3(Math.cos(u * 2 * Math.PI), Math.sin(u * 2 * Math.PI), 0.0);
    vd.colour = vec4(u, v, 0.0, 1.0);
    vd.texCoord = vec2(u, v);

    return vd;
}

Prism.init = function (n,program) {
    this.numSides = n;

    const du = 1.0 / this.numSides;
    const dv = du;
    const h = du * (this.numSides +1) * 2;

    // Bottom Surface
    // Center Point
    const vdCenter = this.getVertexBaseCenter(0);
    AddInAttribArrays(this.bottom,vdCenter);

    // Radius Points
    for (let i = 0; i < this.numSides+2; i++) {//cin
        const vd = this.getVertexBase(i,0);
        AddInAttribArrays(this.bottom, vd);
    }

    setBuffers(this.bottom, program);

    // Top Surface
    // Center Point
    const vdCenterTop = this.getVertexBaseCenter(h);
    AddInAttribArrays(this.top,vdCenterTop);

    // Radius Points
    for (let i = 0; i < this.numSides+2; i++) {//cin
        const vdTop = this.getVertexBase(i,h);
        AddInAttribArrays(this.top, vdTop);
    }
    setBuffers(this.top, program);

    // Side Surfaces
    for (let u = 0; u < 1.0; u += du) {
        for (let v = 0; v < 1.0; v += dv) {
            const vd1 = this.getVertexSides(u, v);
            const vd2 = this.getVertexSides(u + du, v);
            const vd3 = this.getVertexSides(u + du, v + dv);
            const vd4 = this.getVertexSides(u, v + dv);

            AddInAttribArrays(this.sides, vd1);
            AddInAttribArrays(this.sides, vd2);
            AddInAttribArrays(this.sides, vd3);

            AddInAttribArrays(this.sides, vd3);
            AddInAttribArrays(this.sides, vd4);
            AddInAttribArrays(this.sides, vd1);
        }
    }
    setBuffers(this.sides, program);
}

Prism.drawTop = function () {
    setAttribPointers(this.top);
    gl.frontFace(gl.CCW);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.top.pointsArray.length);
}

Prism.drawBottom = function () {
    setAttribPointers(this.bottom);
    gl.frontFace(gl.CCW);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.bottom.pointsArray.length);
}

Prism.drawSides = function () {
    setAttribPointers(this.sides);
    gl.frontFace(gl.CCW);
    gl.drawArrays(gl.TRIANGLES, 0, this.sides.pointsArray.length);
}

Prism.draw = function () {
    this.drawTop();
    this.drawBottom();
    this.drawSides();
}

