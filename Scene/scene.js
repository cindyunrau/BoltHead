// Scene Variables
var testRotation = 0;

// Draw Function
function drawScene(){
    testRotation = testRotation + 30*dt;

    gPush();
    {
        texturesOn();
        testRotation = testRotation + 30*dt;
        gRotate(testRotation,1,1,1);

        drawCube();
        texturesOff();
    }
    gPop();

    gPush();
    {
        gTranslate(3,3,3);
        gRotate(testRotation,1,1,1);
        setColor(vec4(1,1,1,1));
        drawCylinder();
    }
    gPop();
}
