// Scene Variables
var cameraRotation = 0;
var theta = 0;

// Robot Variables
var randWait = 0;
var robotLemniscate = 0;

// Fire Variables
var fireMovement = 0;

function drawRobot(rotation,primaryColor,secondaryColor) {
    var armLength = 20;

    gPush();
        // Lean in Rotation Direction
        gRotate(swish(rotation+90,-5),0,0,1);

        // Head
        gPush();
            setColor(primaryColor);
            setActiveTextures(3,null);
            // Look in Rotation Direction
            gRotate(swish(rotation+90,30),0,1,0);
            gPush();
                gScale(1,0.75,0.6);
                drawOneSidedCube();
            gPop();
            texturesOff();

            setColor(secondaryColor);
            // Ear 1
            gPush();
                gTranslate(0.7,0,0);
                gPush();
                    gScale(0.2,0.2,0.2);
                    drawDonut();
                gPop();
            gPop();

            // Ear 2
            gPush();
                gTranslate(-0.7,0,0);
                gPush();
                    gScale(0.2,0.2,0.2);
                    drawDonut();
                gPop();
            gPop();

            setColor(secondaryColor);

            // Antennae 1
            gPush();
                gTranslate(-1.2,0.5,0);
                gRotate(15,0,0,1);
                gPush();
                    gRotate(90,1,0,0);
                    gScale(0.1,0.1,2);
                    drawCylinder();
                gPop();

                gTranslate(0,1,0);
                gPush();
                    gScale(0.2,0.2,0.2)
                    drawSphere();
                gPop();
            gPop();

            // Antennae 1
            gPush();
                gTranslate(1.2,0.5,0);
                gRotate(15,0,0,-1);
                gPush();
                    gRotate(90,1,0,0);
                    gScale(0.1,0.1,2);
                    drawCylinder();
                gPop();

                gTranslate(0,1,0);
                gPush();
                    gScale(0.2,0.2,0.2)
                    drawSphere();
                gPop();
            gPop();

            // Yellow
            setColor(vec4(1,1,0,1));

            // Spark
            gPush();
                const numSparks = 40;
                var sparkMovement = rotation * 5;
                gTranslate(0,1.2,0);
                for(i=0;i<numSparks;i++){
                    gPush();
                        // Sparks wait randomly between 0-2 cycles of sin()
                        if(Math.abs(swosh(sparkMovement+i,1))<=0.7){
                            if(Math.floor(sparkMovement/180)==randWait) {
                                // Triangle Wave
                                gTranslate(swosh(sparkMovement+i,2),Math.abs((sparkMovement+i)/20-Math.floor((sparkMovement+i)/20+0.5)),0);
                                gScale(0.1,0.1,0.1);
                                drawSphere();
                            } else if(Math.floor(sparkMovement/180)>=randWait) {
                                randWait = Math.floor(sparkMovement/180) + Math.floor(Math.random()*3);
                            }
                        }
                    gPop();
                }
                
            gPop();

        gPop();

        setColor(primaryColor);
        //Body
        gPush();
            gTranslate(0,-2.3,0);
            gPush();
                gScale(1.2,1.2,0.7);
                drawCube();
            gPop();

            // Arm 1
            setColor(secondaryColor);
            gPush();
                gTranslate(-1.3,0.8,0);
                gPush();
                    gScale(0.1,0.3,0.3);
                    drawCube();
                gPop();
                
                gScale(0.25,0.25,0.25);
                for(i=0;i<armLength;i++){
                    // Extra Floppy Arms
                    gTranslate(-1,swish(rotation*5,0.5),swish(rotation*5,0.5));
                    gRotate(swosh(rotation*10,5),0,1,1);
                    gTranslate(0.4,0,0);
                    drawSphere();
                }
                
                gTranslate(-0.6,0,0);
                gScale(0.5,1,1);
                drawCube();
            gPop();

            
            // Arm 2
            setColor(secondaryColor);
            gPush();
                gTranslate(1.3,0.8,0);
                gPush();
                    gScale(0.1,0.3,0.3);
                    drawCube();
                gPop();
                
                gScale(0.25,0.25,0.25);
                for(i=0;i<armLength;i++){
                    gTranslate(1,swosh(rotation*5,0.5),swosh(rotation*5,0.5));
                    gRotate(swish(rotation*10,5),0,1,1);
                    gTranslate(-0.4,0,0);
                    drawSphere();
                }
                
                gTranslate(0.6,0,0);
                gScale(0.5,1,1);
                drawCube();
            gPop();

            // Wheel Supports
            setColor(secondaryColor);
            gPush();
                gTranslate(-0.6,-1.9,0);
                gScale(0.15,0.7,0.15);
                drawCube();
            gPop();

            gPush();
                gTranslate(0.6,-1.9,0);
                gScale(0.15,0.7,0.15);
                drawCube();
            gPop();

            gPush();
                gTranslate(0,-2.5,0);
                gScale(0.6,0.1,0.1);
                drawCube();
            gPop();

            // Wheel
            setActiveTextures(2,null);
            gPush();
                gTranslate(0,-2.5,0);
                gRotate(90,0,1,0)
                
                // Rotate Tire in Rotation Direction
                gRotate(swish(rotation+90,30),0,1,0);
                gRotate(rotation,0,0,-1);
                gScale(0.3,0.3,0.3);
                drawDonut();
            gPop();
            texturesOff();

        gPop();
    gPop();
}

function drawShelf(){
    setColor(vec4(0.2,0.2,0.2,1))
    gPush();
        // Vertical Bars
        gPush();
            gTranslate(-1,2,1)
            gScale(0.1,2.4,0.1);
            drawCube();
        gPop();
        gPush();
            gTranslate(1,2,1)
            gScale(0.1,2.4,0.1);
            drawCube();
        gPop();
        gPush();
            gTranslate(1,2,-1)
            gScale(0.1,2.4,0.1);
            drawCube();
        gPop();
        gPush();
            gTranslate(-1,2,-1)
            gScale(0.1,2.4,0.1);
            drawCube();
        gPop();

        // Horizontal Bars
        gPush();
            gTranslate(0,1,-1)
            gRotate(90,0,0,1);
            gScale(0.1,1,0.1);
            drawCube();
        gPop();
        gPush();
            gTranslate(0,1,1)
            gRotate(90,0,0,1);
            gScale(0.1,1,0.1);
            drawCube();
        gPop();
        gPush();
            gTranslate(1,1,0)
            gRotate(90,1,0,0);
            gScale(0.1,1,0.1);
            drawCube();
        gPop();
            gPush();
            gTranslate(-1,1,0)
            gRotate(90,1,0,0);
            gScale(0.1,1,0.1);
            drawCube();
        gPop();
        gPush();
            gTranslate(0,3,-1)
            gRotate(90,0,0,1);
            gScale(0.1,1,0.1);
            drawCube();
        gPop();
        gPush();
            gTranslate(0,3,1)
            gRotate(90,0,0,1);
            gScale(0.1,1,0.1);
            drawCube();
        gPop();
        gPush();
            gTranslate(1,3,0)
            gRotate(90,1,0,0);
            gScale(0.1,1,0.1);
            drawCube();
        gPop();
            gPush();
            gTranslate(-1,3,0)
            gRotate(90,1,0,0);
            gScale(0.1,1,0.1);
            drawCube();
        gPop();
        gPush();
            gTranslate(0,4,-1)
            gRotate(90,0,0,1);
            gScale(0.02,1,0.02);
            drawCube();
        gPop();
        gPush();
            gTranslate(1,4,0)
            gRotate(90,1,0,0);
            gScale(0.02,1,0.02);
            drawCube();
        gPop();
            gPush();
            gTranslate(-1,4,0)
            gRotate(90,1,0,0);
            gScale(0.02,1,0.02);
            drawCube();
        gPop();

        setActiveTextures(4,null);

        // Platforms
        gPush();
            gTranslate(0,1,0)
            gRotate(-90,1,0,0);
            gRotate(90,0,0,1);
            gScale(0.9,0.9,0.1);
            drawCube();
        gPop();
        gPush();
            gTranslate(0,3,0)
            gRotate(-90,1,0,0);
            gRotate(90,0,0,1);
            gScale(0.9,0.9,0.1);
            drawCube();
        gPop();

        setActiveTextures(5,null);

        // Crates
        gPush();
            gTranslate(0,0.2,0)
            gScale(0.7,0.7,0.7);
            drawCube();
        gPop();
        gPush();
            gTranslate(0.2,1.8,0)
            gRotate(10,0,1,0);
            gScale(0.7,0.7,0.7);
            drawCube();
        gPop();
        gPush();
            gTranslate(0.2,3.5,0)
            gRotate(-25,0,1,0);
            gScale(0.7,0.4,0.7);
            drawCube();
        gPop();
        gPush();
            gTranslate(0.2,4.3,0)
            gScale(0.4,0.4,0.4);
            drawCube();
        gPop();

        texturesOff();


    gPop();
}

function drawFire(){
    gPush();      
        gPush();
            gRotate(-90,1,0,0);
            gScale(0.3,0.3,1);
            drawCone();
        gPop();
        gTranslate(0,-0.5,0);
        gRotate(180,0,0,1);
        gScale(0.285,0.285,0.285);
        drawSphere();
    gPop();
}

// Draw Function
function drawScene(){
    // Camera Variables
    cameraRotation = cameraRotation + 5*dt;
    theta = toRadians(cameraRotation); 

    // Robot Variables
    const robotPrimaryColor = vec4(0.439,0.573,0.745,1);
    const robotSecondaryColor = vec4(0.243,0.318,0.412,0.5);
    robotLemniscate = robotLemniscate + 30*dt;
    var robotLemniscateX = 1.5*swish(robotLemniscate+90,3);
    var robotLemniscateZ = 0.5*swosh(robotLemniscate+90,3)*swish(robotLemniscate+90,3);
    var robotLemniscateRot = 135+swish(robotLemniscate,1)*135+45;

    // Fire Variables
    fireMovement = fireMovement + 20*dt;

    // Eye Rotation
    setEye(eye[0]*Math.cos(theta) + eye[2]*Math.sin(theta),eye[1]+6,-eye[0]*Math.sin(theta) + eye[2]*Math.cos(theta));

    // Robot
    gPush();
        gTranslate(0,-1.1,0);
        gTranslate(robotLemniscateX,0,robotLemniscateZ);
        gRotate(robotLemniscateRot,0,1,0);
        setColor(vec4(0.5,0.0,0.5,0.5));
        gScale(0.5,0.5,0.5);
        drawRobot(robotLemniscate,robotPrimaryColor,robotSecondaryColor);
    gPop();

    // Shelves
    gPush();
        gPush();
            gTranslate(-2,-3.5,-5.7);
            drawShelf();
            gTranslate(2,0,0);
            drawShelf();
        gPop();
        gPush();
            gRotate(180,0,1,0);
            gTranslate(-1,-3.5,-5.7);
            drawShelf();
        gPop();
    gPop();

    setActiveTextures(6,null);
        gPush();
            gTranslate(-2.6,-1.8,-4.7); 
            gRotate(35,1,0,0);
            gRotate(15,0,0,1);
            gScale(Math.abs(swish(fireMovement,1)),1,1);
            drawFire();
        gPop();
    texturesOff();
    
    // Floor
    setActiveTextures(1,null);
        gPush();
            gTranslate(0,-4,0);
            gRotate(90,1,0,0);
            gScale(4,4,0.5);
            drawPrism();
        gPop();
    texturesOff();
}
