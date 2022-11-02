// Texture Variables
var useTextures = 0;
var blendTextures = 0;
var textureArray = [];
var activeTexture;

// Draw Functions 
function drawCube() {
    setMV();
    Cube.draw();
}

function drawSphere() {
    setMV();
    Sphere.draw();
}

function drawCylinder() {
    setMV();
    Cylinder.draw();
}

function drawCone() {
    setMV();
    Cone.draw();
}

// Transformation Functions 
function gTranslate(x,y,z) {
    modelMatrix = mult(modelMatrix,translate([x,y,z]));
}

function gRotate(theta,x,y,z) {
    modelMatrix = mult(modelMatrix,rotate(theta,[x,y,z]));
}

function gScale(sx,sy,sz) {
    modelMatrix = mult(modelMatrix,scale(sx,sy,sz));
}

function gPop() {
    modelMatrix = MS.pop();
}

function gPush() {
    MS.push(modelMatrix);
}

// Texture Functions
function setColor(c)
{
    ambientProduct = mult(lightAmbient, c);
    diffuseProduct = mult(lightDiffuse, c);
    specularProduct = mult(lightSpecular, materialSpecular);
    
    gl.uniform4fv( gl.getUniformLocation(program,
                                         "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
                                         "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
                                         "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
                                         "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program, 
                                        "shininess"),materialShininess );
}

function loadFileTexture() {
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,255,255]));
    
    var image = new Image();
    image.src = "images/textures/f-texture.png";

    image.onload = function() { 
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
     }
}

function initTextures() {
    textureArray.push({}) ;
    loadFileTexture() ;
}

function texturesOn() {
    useTextures = 1;
	gl.uniform1i(gl.getUniformLocation(program, "useTextures"), useTextures);
}

function texturesOff() {
    useTextures = 0;
	gl.uniform1i(gl.getUniformLocation(program, "useTextures"), useTextures);
}

function textureBlendingOn() {
    blendTextures = 1;
	gl.uniform1i(gl.getUniformLocation(program, "blendTextures"), blendTextures);
}

function textureBlendingOff() {
    blendTextures = 0;
	gl.uniform1i(gl.getUniformLocation(program, "blendTextures"), blendTextures);
}