// Scene Variables
var testRotation = 0;
var testMovement = 0;
var blocksize = 20;
var randomStart = randomArray(blocksize*blocksize,0,6);
var randomAngle = randomArray(blocksize*blocksize,0,50);
var randomMovement = randomArray(blocksize*blocksize,0,5);
var theta = 0;
var test = 3; 

function randomArray(size,min,max){
    output = [];
    for(i=0;i<size;i++){
        output.push(randomInt(min,max))
    }
    return output;
}

function addMovement(x){
    return x + randomInt(0,10)*dt;
}

function drawBlocks(){
    gPush();
        gTranslate(-blocksize+1,bottom-8,blocksize-1);
        for(i=0;i<blocksize;i++){
            for(j=0;j<blocksize;j++){
                gPush();
                    randomAngle[blocksize*i+j] = randomAngle[blocksize*i+j] + dt;
                    gTranslate(0,swosh(randomAngle[blocksize*i+j],1),0);
                    gScale(1,10,1);
                    drawCube();
                gPop();
                gTranslate(0,0,-2);
            }
            gTranslate(2,0,2*Math.abs(blocksize));
        }
    gPop();
}

function drawRobot() {

    // Head
    gPush();
        gScale(1,0.75,0.75);
        drawCube();

        // Ear 1
        gPush();
            gTranslate(1.15,0,0);
            gScale(0.15,0.6,0.6);
            drawCube();
        gPop();

        // Ear 2
        gPush();
            gTranslate(-1.15,0,0);
            gScale(0.15,0.6,0.6);
            drawCube();
        gPop();
    gPop();

   
}
// x = texture2D(u_tex, v_texCoord) *u_color;

// Draw Function
function drawScene(){
    testRotation = testRotation + 5*dt;
    theta = toRadians(testRotation); 
    testMovement = testMovement + 10*dt;
    //randomAngle = randomAngle + 10*dt;
    test = test + 10*dt;
    //console.log(randomAngle);
    
    setEye(eye[0]*Math.cos(theta) + eye[2]*Math.sin(theta),eye[1]+6,-eye[0]*Math.sin(theta) + eye[2]*Math.cos(theta));

    // setActiveTextures(2,null)
    //     //drawBlocks();
    //     gTranslate(-3,0,0);
    //     drawRobot();


    // texturesOff();


    //setColor(vec4(0.5,0.0,0.5,0.5));
    //gTranslate(0,2,0);
    drawRobot();

    setActiveTextures(0,null)
        //drawBlocks();
        gTranslate(-3,0,0);
        drawRobot();


    texturesOff();

}
