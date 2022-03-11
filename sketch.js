//Criando Variáveis
var trex, trex_running, trex_collided;
var edges;
var ground, groundImage;
var chaoinvisivel;
var nuvens, nuvenImage;
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6;
var gameover,gameoverimg;
var restart,restartimg;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var jumpSound;
var dieSound;
var checkSound;
var score = 0;
//Pré-carregamento de imagens para criar uma animação em sprites
function preload() {
  //variável auxiliar trex_running recebendo as imagens 
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  //variável auxiliar groundImage recebendo as imagens 
  groundImage = loadImage("ground2.png");
nuvenImage = loadImage("cloud.png");
cacto1 = loadImage ("obstacle1.png");
cacto2 = loadImage ("obstacle2.png");
cacto3 = loadImage ("obstacle3.png");
cacto4 = loadImage ("obstacle4.png");
cacto5 = loadImage ("obstacle5.png");
cacto6 = loadImage ("obstacle6.png");
gameoverimg = loadImage("gameOver.png");
restartimg = loadImage ("restart.png");
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
checkSound = loadSound("checkPoint.mp3");
}

//Configuração
function setup() {
  //Criando a área do jogo
  createCanvas(windowWidth,windowHeight);

  //criando o chao invisivel
  chaoinvisivel = createSprite(width/2, height-10,width , 10);
  chaoinvisivel.visible = false;
  
  obstaculoG = new Group();
 nuvenG = new Group();
  
  //criando o trex
  //sprite trex
  trex = createSprite(50, height-40, 20, 50);
  //adicionando animação na var oficial com o rótulo running
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colisao",trex_collided);
  //Escala
  trex.scale = 0.5;

  //Criando as bordas para a área do jogo
  edges = createEdgeSprites();

  //Criando o solo
  //Sprite do solo
  ground = createSprite(width/2, height-20, width, 20);
  //adicionando uma imagem para o chão na var oficial 
  ground.addImage("ground", groundImage);
  //dividindo o tamando do chão por 2 para ele recarregar 
  ground.x = ground.width / 2;

  gameover = createSprite(width/2,height/2);
  restart = createSprite (width/2,height/2 + 40);
  gameover.addImage(gameoverimg);
  restart.addImage(restartimg);
  restart.scale = 0.5;
  gameover.scale = 0.5;
  gameover.visible = false;
  restart.visible = false;
  trex.setCollider("circle",0,0,50);
 //trex.debug= true; 
//var teste =  Math.round(random(1,100));
//console.log (teste);

}


function draw() {
  background("white");
text("pontuaçao: "+ score,width-100,50);
  if(gamestate===PLAY){
    ground.velocityX =  -(4+score/100);
score = score+ Math.round(getFrameRate()/60);
if (score > 0 && score % 100 === 0){
  checkSound.play();
}
    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }
    if(touches.length>0 || keyDown("space")){
      if(trex.y>=height-40){
        trex.velocityY = -10;
        jumpSound.play();
        touches = [];
      }
    }

    
  
    //Gravidade para o trex voltar
    trex.velocityY = trex.velocityY + 0.5;

    criarnuvens();
    criarcactos();

    if(obstaculoG.isTouching(trex)){
  gamestate = END;
  dieSound.play();
    }
    }
    else if(gamestate === END){
      gameover.visible =true;
      restart.visible = true;
      ground.velocityX = 0;
      trex.velocityY = 0;
      trex.changeAnimation("colisao",trex_collided);
      obstaculoG.setLifetimeEach(-1);
      nuvenG.setLifetimeEach(-1);
      obstaculoG.setVelocityXEach(0);
      nuvenG.setVelocityXEach(0);
      if (mousePressedOver(restart)|| touches.length>0){
        touches=[];
        reset();
      }
    }
  
  
  // impedir que o trex caia 
  trex.collide(chaoinvisivel);

  drawSprites();
}
function reset (){
  gamestate = PLAY;
  restart.visible = false;
  gameover.visible = false;
  obstaculoG.destroyEach();
  nuvenG.destroyEach();
  trex.changeAnimation("running", trex_running);
  score = 0;
}
function criarcactos() {
  if (frameCount%60==0){
  var cacto = createSprite(width+10,height-35,10,40);
  cacto.velocityX = -(4+score/100);

  var numaleatorio = Math.round(random(1,6));
  switch(numaleatorio){

case 1 : cacto.addImage(cacto1);
break;

case 2 : cacto.addImage(cacto2);
break;

case 3 : cacto.addImage(cacto3);
break;

case 4 : cacto.addImage(cacto4);
break;

case 5 : cacto.addImage(cacto5);
break;

case 6 : cacto.addImage(cacto6);
break;

default:break;
  }
  cacto.scale = 0.5;
  cacto.lifetime = width+10;
  obstaculoG.add(cacto);
  }
}
function criarnuvens() {
if (frameCount%60==0){
nuvens = createSprite(width+10,height-100,10,10);
 nuvens.y = Math.round(random(height-150,height-100)) ;
  nuvens.velocityX = -3;
  nuvens.addImage("nuven",nuvenImage);
  nuvens.scale = 0.5;
  nuvens.depth = trex.depth;
  trex.depth = trex.depth + 1; 
  nuvens.lifetime = width+10;
  nuvenG.add(nuvens);
}
  
 
  
  
  

  
}
