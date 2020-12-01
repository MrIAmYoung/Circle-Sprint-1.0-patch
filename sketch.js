var ball, ballImage;
var spike, spikeImage, spikeGroup;
var ground;
var gamestate = 0;
var reset, resetImage;
var score = 0;

function preload(){
    spikeImage = loadImage("spike-png-2.png");
    ballImage = loadImage("ball1.png");
    resetImage = loadImage("1443321549047.png");
}

function setup(){
    createCanvas(800,400);
    ball = createSprite(100,310);
    ball.addImage("ball",ballImage);
    ball.scale = 0.07;
    

    spikeGroup = createGroup();

    ground = createSprite(400,375,800,50);

    reset = createSprite(400,200);
    reset.addImage("reset",resetImage);
    reset.visible = false;
    reset.scale = 0.3;
}

function draw(){
    background("powderblue");
    text("Score:"+score,700,50);
        if (gamestate === 0){
            score=score+Math.round((getFrameRate()/60));
            if (keyDown("space") && ball.y>300){
                ball.velocityY = -11.5;
            }

            ball.velocityY = ball.velocityY + 0.75

            if (ball.isTouching(spikeGroup)){
                gamestate = 1;
            }
        }

        if (gamestate === 1){
            ball.velocityY = 0;
            spikeGroup.setVelocityXEach(0);
            reset.visible = true;
            spikeGroup.setLifetimeEach(-1);

            if(mousePressedOver(reset)){
                restartGame();
            }
        }
        ball.collide(ground);
        spamSpikes();
    drawSprites();
}

function spamSpikes(){
    if (frameCount % 80 === 0){
        spike = createSprite(800,295);
        spike.addImage("spike",spikeImage);
        spike.scale = 0.145;
        spike.setCollider("rectangle",0,85,120,500,0)
        spike.velocityX = -10;
        spike.lifetime = 80;
        spikeGroup.add(spike);
    }
}

function restartGame(){
    spikeGroup.destroyEach();
    ball.y=310;
    reset.visible = false;
    gamestate = 0;

}