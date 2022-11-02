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

// --------------- SPHERE SUB --------------
const SphereSub = {};

SphereSub.numTimesToSubdivide = 4;
SphereSub.index = 0;
SphereSub.pointsArray = [];
SphereSub.normalsArray = [];

SphereSub.triangle = function (a, b, c) {
    const na = vec3(a[0], a[1], a[2]);
    const nb = vec3(b[0], b[1], b[2]);
    const nc = vec3(c[0], c[1], c[2]);

    this.normalsArray.push(na);
    this.normalsArray.push(nb);
    this.normalsArray.push(nc);

    this.pointsArray.push(a);
    this.pointsArray.push(b);
    this.pointsArray.push(c);

    this.index += 3;
}

SphereSub.divideTriangle = function (a, b, c, count) {
    if (count > 0) {

        let ab = mix(a, b, 0.5);
        let ac = mix(a, c, 0.5);
        let bc = mix(b, c, 0.5);

        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);

        this.divideTriangle(a, ab, ac, count - 1);
        this.divideTriangle(ab, b, bc, count - 1);
        this.divideTriangle(bc, c, ac, count - 1);
        this.divideTriangle(ab, bc, ac, count - 1);
    } else {
        this.triangle(a, b, c);
    }
}

SphereSub.tetrahedron = function (a, b, c, d, n) {
    this.divideTriangle(a, b, c, n);
    this.divideTriangle(d, c, b, n);
    this.divideTriangle(a, d, b, n);
    this.divideTriangle(a, c, d, n);
}

SphereSub.init = function (program) {
    const va = vec4(0.0, 0.0, -1.0, 1);
    const vb = vec4(0.0, 0.942809, 0.333333, 1);
    const vc = vec4(-0.816497, -0.471405, 0.333333, 1);
    const vd = vec4(0.816497, -0.471405, 0.333333, 1);

    this.tetrahedron(va, vb, vc, vd, this.numTimesToSubdivide);
    setBuffers(this, program);
}

SphereSub.draw = function () {
    setAttribPointers(this);
    gl.drawArrays(gl.TRIANGLES, 0, this.index);

}

// --------------- CUBE --------------
Cube = {};
Cube.numVertices = 36;

Cube.pointsArray = [];
Cube.normalsArray = [];
Cube.colorsArray = [];
Cube.texCoordsArray = [];

const cubeVertices = [
    1, 1, 1,    -1, 1, 1,   -1, -1, 1,
    -1, -1, 1, 1, -1, 1, 1, 1, 1,   

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
    1, 1, 0, 1, 0, 0,  
    0, 0, 1, 0, 1, 1,   

    0, 1, 0, 0, 1, 0,    
    1, 0, 1, 1, 0, 1,   

    1, 0, 1, 1, 0, 1,     
    0, 1, 0, 0, 1, 0,   

    1, 1, 0, 1, 0, 0,    
    0, 0, 1, 0, 1, 1,   

    0, 1, 0, 0, 1, 0,    
    1, 0, 1, 1, 0, 1,     

    0, 0, 1, 0, 1, 1,   
    1, 1, 0, 1, 0, 0
];   

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

function AddInAttribArrays(obj, v) {
    obj.pointsArray.push(v.position);
    obj.normalsArray.push(v.normal);
    obj.colorsArray.push(v.colour);
    obj.texCoordsArray.push(v.texCoord);
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

