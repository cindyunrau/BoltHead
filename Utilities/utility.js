// Texture Variables
var useTextures = 0;
var blendTextures = 0;
var textureArray = [];

// Helper Functions
// Converts angle in degrees to radians
function toRadians(angle){
	return angle * (Math.PI / 180);
}

// Converts angle in radians to degrees
function toDegrees(angle){
	return angle * (180/ Math.PI);
}

// Takes rotation value in radians and translates to back and forth motion using sin, 
// the severity of the motion is defined by the magnitude
function swish(rotation,magnitude){
	return Math.sin(toRadians(rotation))*magnitude;
}

// Takes rotation value in radians and translates to back and forth motion using cos, 
// the severity of the motion is defined by the magnitude
function swosh(rotation,magnitude){
	return Math.cos(toRadians(rotation))*magnitude;
}

function randomInt(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function randomArray(size,min,max){
    output = [];
    for(i=0;i<size;i++){
        output.push(randomInt(min,max))
    }
    return output;
}

function getTimestamp(timestamp){
    useTextures = 1;
    gl.uniform1f(gl.getUniformLocation(program, "timestamp"), timestamp/100);
}

// Matrix Functions
function setMV() {
    modelViewMatrix = mult(viewMatrix,modelMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    normalMatrix = inverseTranspose(modelViewMatrix);
    gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix) );
}

function setAllMatrices() {
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix) );
    setMV();   
}

// Draw Functions 
function drawCube() {
    setMV();
    Cube.draw();
}

function drawOneSidedCube() {
    setMV();
    OneSidedCube.draw();
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

function drawPrism(){
    setMV();
    Prism.draw();
}

function drawDonut() {
    setMV();
    Donut.draw();
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
    
    gl.uniform4fv( gl.getUniformLocation(program, "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program, "shininess"),materialShininess );                                 
}

function loadFileTexture(tex, filename) {
    tex.textureWebGL  = gl.createTexture();
    tex.image = new Image();
    tex.image.src = filename ;
    tex.isTextureReady = false ;
    tex.image.onload = function() { handleTextureLoaded(tex); }
}

function createShadows(){
    const depthTexture = gl.createTexture();
    const depthTextureSize = 512;
    gl.bindTexture(gl.TEXTURE_2D, depthTexture);
    gl.texImage2D(
        gl.TEXTURE_2D,      // target
        0,                  // mip level
        gl.DEPTH_COMPONENT, // internal format
        depthTextureSize,   // width
        depthTextureSize,   // height
        0,                  // border
        gl.DEPTH_COMPONENT, // format
        gl.UNSIGNED_INT,    // type
        null);              // data
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
     
    const depthFramebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,       // target
        gl.DEPTH_ATTACHMENT,  // attachment point
        gl.TEXTURE_2D,        // texture target
        depthTexture,         // texture
        0);                   // mip level
}

function handleTextureLoaded(textureObj) {
    gl.bindTexture(gl.TEXTURE_2D, textureObj.textureWebGL);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); 

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureObj.image);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);

    gl.generateMipmap(gl.TEXTURE_2D);
	
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); 
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); 
    gl.bindTexture(gl.TEXTURE_2D, null);
    
    textureObj.isTextureReady = true ;
}

function waitForTextures() {
    setTimeout(
		function() {
			   var n = 0 ;
               for ( var i = 0 ; i < textureArray.length ; i++ )
               {
                    n = n+textureArray[i].isTextureReady ;
               }
               if( n != textureArray.length )
               {
               		console.log("Textures not ready yet") ;
               		waitForTextures() ;
               }
               else
               {
               		console.log("Textures are ready to PARTY!") ;
					render(0);
               }
		},
	5) ;
}

function initTextures() {
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"Images/Textures/test.png"); // 0
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"Images/Textures/ground.png"); // 1 
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"Images/Textures/tire.png"); // 2
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"Images/Textures/robot_face.png"); // 3
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"Images/Textures/wood.png"); // 4
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"Images/Textures/crate.png"); // 5
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"Images/Textures/fire.png"); // 6
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

function setActiveTextures(i,j) {
    texturesOn();

    gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, textureArray[i].textureWebGL);
	gl.uniform1i(gl.getUniformLocation(program, "texture0"), 0);

    if(j != null){
            textureBlendingOn();
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, textureArray[j].textureWebGL);
            gl.uniform1i(gl.getUniformLocation(program, "texture1"), 1);
    }
}

// Camera Functions
function cameraTranslate(x,y,z){
    viewMatrix = mult(viewMatrix,translate([0,1,0]));
    setMV();
}

function cameraRotate(theta,x,y,z) {
    viewMatrix = mult(viewMatrix,rotate(theta,[x,y,z]));
}

function cameraScale(sx,sy,sz) {
    viewMatrix = mult(viewMatrix,scale(sx,sy,sz));
}

function setEye(x,y,z) {
    eye = vec3(x,y,z);
    viewMatrix = lookAt(eye, at, up);
    setMV();
}

function setAt(x,y,z) {
    at = vec3(x,y,z);
    viewMatrix = lookAt(eye, at, up);
    setMV();
}

// FPS
function getFps(){
    return 1/dt;
}

