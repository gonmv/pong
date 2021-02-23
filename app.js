/* canvas var */
var canvas;
var canvasContext;

/* ball var */
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 10;

/* score var */
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

/* winning screen */

var showWinningScreen = false;

/* paddle var */
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100; 
const PADDLE_THICKNESS = 10; 

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}
function handleMouseClick(evt) {
    if(showWinningScreen) {
        player1Score = 0;
        player2Score = 0;
        showWinningScreen = false;
    }
}

/* init */
window.onload = function() { 
    canvas = document.getElementById('gameCanvas'); //get canvas attributes. 
    canvasContext = canvas.getContext('2d'); // set 2 dimensions (?).
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
        }, 1000/framesPerSecond);
    canvas.addEventListener('mousedown', handleMouseClick); 
    canvas.addEventListener('mousemove', 
    function(evt) {
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
    })
}

/* ball reset position after anotation */
function ballReset() {
        if(player1Score >= WINNING_SCORE ||
           player2Score >= WINNING_SCORE) {
               showWinningScreen = true;
        }
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width/2;
        ballY = canvas.height/2;
        
}

/* player2 = computer */
function computerMovement() {
        var paddle2Ycenter = paddle2Y + (PADDLE_HEIGHT/2);
        if(paddle2Ycenter < ballY-35) {
                paddle2Y += 10;    
        } else  if(paddle2Ycenter >ballY-35) {
                paddle2Y -= 10;
    }
}

/* move */
function moveEverything() {
    if(showWinningScreen == true) {
            return;
    }
    computerMovement();    
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX < 20) {
        if(ballY > paddle1Y && 
           ballY < paddle1Y+PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                var deltaY = ballY-(paddle1Y+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY*0.35;
        } else {
                player2Score++;
                ballReset();

        }    
    }

    if(ballX > canvas.width - 20) {
        if(ballY > paddle2Y && 
           ballY < paddle2Y+PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                var deltaY = ballY-(paddle2Y+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY*0.35;
        } else {
                player1Score++;
                ballReset();
        }    
    }
    
    if(ballY > canvas.height - 20) {
        ballSpeedY = -ballSpeedY;    
    }
    if(ballY < 20) {
        ballSpeedY = -ballSpeedY;    
    }

}


function drawNet () {
    for(var i=0;i<canvas.height;i+=40) {
        colorRect(canvas.width/2-1,i,2,20,'white'); 
    }
}

/* draw */
function drawEverything() {

    /* background: fill and size */
    colorRect(0,0,canvas.width,canvas.height,'black');



    /* rectangle 1 "player 1": fill and size  */
    colorRect(5,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'#FF0000');
    canvasContext.fillText(player1Score, 100 , 100);

    /* rectangle 2 "player 2": fill and size  */
    colorRect(canvas.width-15,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'#00FF00');
    canvasContext.fillText(player2Score, canvas.width-100 , 100);

    /* Net */
    drawNet();

    /* circle "ball": fill and size  */
    colorCircle(ballX,ballY,10,'#0055BB');    

    if(showWinningScreen) {
           canvasContext.fillStyle = "#0000FF";
           if(player1Score >= WINNING_SCORE) {
           canvasContext.fillText("PLAYER 1 WON!", 350 , 200);
           } else if(player2Score >= WINNING_SCORE) {
           canvasContext.fillText("PLAYER 2 WON!", 350 , 200);
           }
           canvasContext.fillText("(Click to continue)", 350 , 500);
           }
           
            return;
    }

   
   
   



/* rectangle template that includes color attribute */
function colorRect(leftX,topY,width,height,drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
}

/* circle template that includes color attribute */
function colorCircle(centerX,centerY,radius,drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);    
    canvasContext.fill();  

}
