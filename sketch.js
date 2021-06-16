var PLAY = 1;
var END = 0;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime = Math.round(0);
var gameState = PLAY;
var background,backImg;
var score = 0;
var lifetime = 2;
var restart,restartImg;
var game,gamea;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacelImage = loadImage("obstacle.png");
  backImg = loadImage("jungle.jpg"); 
 
  game = loadImage("game.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600,400);
  
  backg = createSprite(0,100,600,400);
  backg.addImage(backImg);
  backg.scale = 1.2;
  backg.velocityX = -7;
  backg.x = backg.width /2;
  

 monkey = createSprite(80,315,20,20);
 monkey.addAnimation("running",monkey_running);
 monkey.scale =  0.1;
  
 ground = createSprite(5,350,600,10);
 ground.velocityX = -3;
 ground.x = ground.width/2;
 ground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  gamea = createSprite(300,170,20,20);
  gamea.addImage(game);
  gamea.scale = 0.2;
  
  restart = createSprite(300,270,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.1;
   
}

function draw() {
  
  background("backg");
  
  if(gameState === PLAY){
    
    monkey.visible = true;
    
    gamea.visible = false;
    restart.visible = false;
    
     ground.x = ground.width/2;
  if(backg.x <0){
    
    backg.x = backg.width/2;
    
  }
  
  monkey.collide(ground);
 
  if(frameCount % 20 === 0){
    
    survivalTime = survivalTime +1;
    
  }  

  
if(keyDown("space") && monkey.y>235){
  
  monkey.velocityY = -15;
  
 
}
  
    monkey.velocityY  = monkey.velocityY + 0.7;
  
  food();
  obstacles();
    
  if(foodGroup.isTouching(monkey)){
    
    foodGroup.destroyEach();
    score = score +2;
    
  }  
    
    switch(score){
        
      case 10: monkey.scale = 0.12;
        break;
      case 20: monkey.scale = 0.14;
        break;
      case 30: monkey.scale = 0.16;
        break;
      case 40: monkey.scale = 0.18; 
        break;
      case 50: monkey.scale = 0.20;
        break;
        
 default: break;
            
    }
    
   if(obstacleGroup.isTouching(monkey)){
     
     monkey.scale = 0.1;
     obstacleGroup.destroyEach();
     lifetime = lifetime - 1;
     survivalTime = survivalTime -10;
     
   } 
    
    if(lifetime === 0){
      
      gameState = END;
      
    }
    
  }
  
  if(gameState === END){
    
      backg.velocityX = 0;
      monkey.visible = false;
      gamea.visible = true;
      restart.visible = true;
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
     
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
  
   stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score,500,50);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time : "  +  survivalTime,30,50);
   
}

 function reset(){
   
    backg.velocityX = -7;
    monkey.visible = true;
    monkey.collide(ground);
    gameState = PLAY;
    score = 0;
    survivalTime = 0;
    lifetime = 2;
    gamea.visible = false; 
    
  }

function food(){
  
  if(frameCount % 150 === 0){
    banana = createSprite(600,200,10,20);
    
    banana.addImage(bananaImage);
    
    banana.scale = 0.1;
    
    banana.y = Math.round(random(120,200));
    
    banana.velocityX = -3;
    
    banana.lifetime = 250;
    
    banana.depth = monkey.depth;
    
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
    
  }
}
  
  function obstacles(){
    
    if(frameCount % 300 === 0){
      
      obstacle = createSprite(600,330,20,20);
      
      obstacle.addImage(obstacelImage);
      
      obstacle.scale = 0.1;
      
      obstacle.velocityX = -3;
      
      obstacle.lifetime = 250;
      
      obstacle.depth  = monkey.depth;
      
      monkey.depth = monkey. depth +1;
      
      obstacleGroup.add(obstacle);
      
    }
    
    
    
    
  }
  
 
  






    
    
    
  
  







