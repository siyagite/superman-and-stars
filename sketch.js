var PLAY = 1;
var END = 0;
gameState = PLAY;
var score = 0;

var background, backgroundImage;
var ground;
var obstacle, obstacleImage, obstacleGroup;
var objects, objectsImage,objectsGroup;
var body, bodyImage;
var jumpSound, gameoverSound;
var gameOver,gameOverImage;


function preload(){
  backgroundImage=loadImage("background.jpg");
  objectsImage = loadImage ("star.png");
  bodyImage = loadImage ("dog.png");
  obstacleImage = loadImage ("obstacle.png");
  jumpSound = loadSound ("jump.mp3");
  gameoverSound = loadSound ("gameover.mp3");
   gameOverImage = loadImage ("gameover.png");
  
}

function setup() {
  createCanvas(900,900);
  
  ground = createSprite(600,280,100,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=true;
  ground.addImage (backgroundImage);
  ground.scale = 2;
  
  body = createSprite (150,110,10,10);
  body.addImage (bodyImage);
  body.scale = 0.3;
  
  gameOver = createSprite (200,200,100,100);
  gameOver.addImage (gameOverImage);
  gameOver.scale = 0.50;
  gameOver.visible=false;
    
  obstacleGroup = new Group;
  objectsGroup = new Group
  
  
}

function draw() {
  
  if (gameState === PLAY){
  if(ground.x < 0) {
    ground.x=ground.width/2;
  }
  
  if (objectsGroup.isTouching(body)){
      objectsGroup.destroyEach ();
      score = score + 1;
      jumpSound.play();    
  }
  
  if (keyWentDown (UP_ARROW)){
    body.velocityY = - 5;
  }
  
   if (keyWentDown (DOWN_ARROW)){
    body.velocityY = 5;
         
  }
   if (obstacleGroup.isTouching(body)||body.y<0||body.y>500){
       gameState = END;
     }
    
  }  
  
 
   
  spawnObjects();
  spawnObstacles();
    
  drawSprites();
 
  textSize(20);
  fill("white");
  text("Score: "+ score, 380,50);
}


function spawnObjects(){
 if (frameCount%90===0){
     objects = createSprite (600,250,10,20);
     objects.addImage (objectsImage);
     objects.scale = 0.06;
     objects.y = Math.round (random(100,490));
     objects.lifetime = 800;
     objects.velocityX = -5;
     objectsGroup.add (objects) ;     
   }
}

function spawnObstacles(){
  if (frameCount%200===0){
      obstacle = createSprite (600,240,10,20);
      obstacle.addImage (obstacleImage);
      obstacle.y = Math.round(random(100,490));
      obstacle.scale = 0.2;
      obstacle.lifetime = 800;
      obstacle.velocityX = -2;
      obstacleGroup.add (obstacle);
      
  }

  if (gameState === END){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach (0);
    objectsGroup.setVelocityXEach (0);
    obstacleGroup.destroyEach();
    objectsGroup.destroyEach();
    body.velocityY = 0;
    gameoverSound.play ();
    gameOver.visible=true;
    
   
 }
}