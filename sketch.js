var PLAY;
var FALL;
var OVER;
var END;
var gameState = PLAY
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var box1S, box2S, box3S;
var box1, box2, box3;
var packageBody, ground;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	engine = Engine.create();
	world = engine.world;

	var package_options ={isStatic:true,restitution: 0.7}
	var ground_options ={isStatic:true}
	var boxes_options ={isStatic:true}
	
	packageBody = Bodies.rectangle(400 , 80, 50, 50 , package_options);
	
	ground = Bodies.rectangle(width/2, height-55, width, 10, ground_options);
	
	box1 = Bodies.rectangle(275, 590, 20, 100, boxes_options);
    box2 = Bodies.rectangle(475, 590, 20, 100, boxes_options);
	box3 = Bodies.rectangle(375, 630, 200, 20, boxes_options);
  
	packageSprite=createSprite(packageBody.position.x, packageBody.position.y, 10,50);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	groundSprite=createSprite(ground.position.x, ground.position.y, width,10);
	groundSprite.shapeColor=color(255)

	helicopterSprite=createSprite(width/2, 80, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6
	
	box1S=createSprite(box1.position.x, box1.position.y, 20,100);
	box1S.shapeColor = "red";
	box2S=createSprite(box2.position.x, box2.position.y, 20,100);
	box2S.shapeColor = "red";
	box3S=createSprite(box3.position.x, box3.position.y, 200,20);
	box3S.shapeColor = "red";
	
	World.add(world, packageBody);
	World.add(world, ground);
	World.add(world, box1);
	World.add(world, box2);
	World.add(world, box3);

}


function draw() {

  Engine.update(engine);

  rectMode(CENTER);
  background(0);
  
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y

  groundSprite.x= ground.position.x 
  groundSprite.y= ground.position.y

  box1S.x= box1.position.x 
  box1S.y= box1.position.y

  box2S.x= box2.position.x 
  box2S.y= box2.position.y

  box3S.x= box3.position.x 
  box3S.y= box3.position.y
  
  if (gameState == PLAY)
  {
  moveBody();
  if (keyCode===DOWN_ARROW)
  {
	  gameState = MOVE
  }
  }

  if (gameState == MOVE)
  {
	  helicopterSprite.velocityX = 0;
	  packageBody.position.x=helicopterSprite.x
	  packageSprite.velocityX =0;
	  packageSprite.velocityY =0;
	  packageBody.velocity.x = 0;
	  packageBody.velocity.x = 0;
	  Matter.Body.setStatic(packageBody,false)

	  if(packageSprite.x > 290 && packageSprite.x < 460 && packageSprite.y > 490
		)
	  {
		textSize(30)
		textFont("times new roman")
		text("You Successfully delivered the medicine ",125,350)
	  } else if((packageSprite.x < 290 || packageSprite.x > 460 && packageSprite.y > 490))
	  {
		textSize(30)
		textFont("times new roman")
		text("You Fail to deliver the medicine",175,350)
	  }
  }
  
  keyPressed();

  console.log(packageBody)

  drawSprites();
 
}

function keyPressed() {
 if (keyCode=== DOWN_ARROW) {
	 Matter.Body.setStatic(packageBody,false)
	 
  }
}

function moveBody(){
	
	packageBody.position.x = helicopterSprite.x
	packageSprite.x = helicopterSprite.x
   // helicopterSprite.visible = false;
	if (keyCode === RIGHT_ARROW)
	{
	  helicopterSprite.velocityX = 3;
	} 
	else 
	if (keyCode === LEFT_ARROW)
	{
	  helicopterSprite.velocityX = -3;
	}
}



