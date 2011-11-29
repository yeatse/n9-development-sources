var currentX;
var currentY;

function updatePosition( reading ) {

    currentX = reading.x
    var xVar = rctDot.y;
    xVar = xVar + currentX;
    if (xVar > 420) xVar = 420;
    if (xVar < 0) xVar = 0;
    rctDot.y = xVar;

    currentY = reading.y
    var yVar = rctDot.x;
    yVar = yVar + ( currentY * 2 );
    if (yVar > 854) yVar = 854;
    if (yVar < 0) yVar = 0;
    rctDot.x = yVar;

}

function move( ) {

    var xVar = rctDot.y;
    xVar = xVar + ( currentX * 4 );
    if (xVar > 420) xVar = 420;
    if (xVar < 0) xVar = 0;
    rctDot.y = xVar;

    var yVar = rctDot.x;
    yVar = yVar + ( currentY * 2 );
    if (yVar > 834) yVar = 834;
    if (yVar < 0) yVar = 0;
    rctDot.x = yVar;

}
