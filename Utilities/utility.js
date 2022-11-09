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
	return Math.cos(rotation)*magnitude;
}

function randomInt(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

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
    console.log(modelMatrix);
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

function loadFileTexture(tex, filename) {
    tex.textureWebGL  = gl.createTexture();
    tex.image = new Image();
    tex.image.src = filename ;
    tex.isTextureReady = false ;
    tex.image.onload = function() { handleTextureLoaded(tex); }
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
    loadFileTexture(textureArray[textureArray.length-1],"Images/Textures/f-texture.png");
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"Images/Textures/sunset.bmp");
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"Images/Textures/test.png");
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
function CameraController(element) {
	var controller = this;
	this.onchange = null;
	this.xRot = 0;
	this.yRot = 0;
	this.scaleFactor = 3.0;
	this.dragging = false;
	this.curX = 0;
	this.curY = 0;

    // Assign a mouse down handler to the HTML element.
	element.onmousedown = function(ev) {
        console.log("down");
		controller.dragging = true;
		controller.curX = ev.clientX;
		controller.curY = ev.clientY;
	};
	
	// Assign a mouse up handler to the HTML element.
	element.onmouseup = function(ev) {
		controller.dragging = false;
	};
	
	// Assign a mouse move handler to the HTML element.
	element.onmousemove = function(ev) {
		if (controller.dragging) {
			// Determine how far we have moved since the last mouse move
			// event.
			var curX = ev.clientX;
			var curY = ev.clientY;
			var deltaX = (controller.curX - curX) / controller.scaleFactor;
			var deltaY = (controller.curY - curY) / controller.scaleFactor;
			controller.curX = curX;
			controller.curY = curY;
			// Update the X and Y rotation angles based on the mouse motion.
			controller.yRot = (controller.yRot + deltaX) % 360;
			controller.xRot = (controller.xRot + deltaY);
			// Clamp the X rotation to prevent the camera from going upside
			// down.
			if (controller.xRot < -90) {
				controller.xRot = -90;
			} else if (controller.xRot > 90) {
				controller.xRot = 90;
			}
			// Send the onchange event to any listener.
			if (controller.onchange != null) {
				controller.onchange(controller.xRot, controller.yRot);
			}
		}
	};
}

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

