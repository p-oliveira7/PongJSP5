//variáveis bolinha
let xBall = 300;
let yBall = 200;
let diametro = 20;
let raio = diametro/2;

//velocidade da bolinha
let velXBall = 6;
let velYBall = 6;

//variáveis da raquete
let xRaq = 5;
let yRaq = 150;
let compriRaq = 10;
let alturaRaq = 90;

//variáveis do oponente
let xRaqO = 585;
let yRaqO = 150;
let velYRaqO;

let chanceDeErrar = 0;
let colidiu = false;

//placar
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;
function preload(){
  trilha = loadSound("sounds/loop.mp3");
  ponto = loadSound("sounds/Click_1.mp3");
  raquetada = loadSound("sounds/Bump_1.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  drawBall();  
  movBall();
  colisãoBorda();
  drawRaq(xRaq, yRaq);
  drawRaq(xRaqO, yRaqO);
  movRaq();
  movRaqO();
  //movRaqOTc();
  colRaqBiblioteca(xRaq,yRaq);
  colRaqBiblioteca(xRaqO,yRaqO);
  drawPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function drawBall(){
  circle(xBall, yBall, diametro);
}

function movBall(){
  xBall += velXBall; 
  yBall += velYBall;
}

function colisãoBorda(){
  if(xBall + raio > width ||
    xBall - raio < 0){
    velXBall *= -1;
  }
  if(yBall + raio > height ||
    yBall - raio < 0){
    velYBall *= -1;
  }
}

function drawRaq(x,y){
  rect(x, y, compriRaq, alturaRaq)
}

function movRaq(){
  if (keyIsDown(UP_ARROW)){
    yRaq -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaq += 10;
  }
}

function movRaqOTc(){
  if (keyIsDown(87)){
    yRaqO -= 10;
  }
  if (keyIsDown(83)){
    yRaqO += 10;
  }
}
function movRaqO(){
  velYRaqO = yBall - yRaqO - alturaRaq + 30 + chanceDeErrar;
  yRaqO += velYRaqO + chanceDeErrar
  calculaChanceDeErrar()
}
function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos){chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40}
    } else {chanceDeErrar -= 1}
      if (chanceDeErrar <= 35) {chanceDeErrar = 35
 }
}

function colRaqBiblioteca(x,y){
 colidiu =
   collideRectCircle(x,y,compriRaq,alturaRaq,xBall, yBall,raio);
  if(colidiu){
    velXBall *= -1;
    raquetada.play();
  }
}

function drawPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(255,140,0);
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBall > 590){
    meusPontos += 1;
    ponto.play()
  }
  if (xBall < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBall - raio < 0){
      xBall = 23
    }
    if (xBall + raio > 600){
      xBall = 580
    }
}
