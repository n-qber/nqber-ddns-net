var COLORS;

const TAMANHO_X = 4 * 137;
const TAMANHO_Y = 4 * 95;

var tamanho_x;
var tamanho_y;

var colorIndex;

var start_x = 10;
var start_y = 10;

var orient;

function setup() {
  createCanvas(900, 500);
  background(220);
  tamanho_x = TAMANHO_X;
  tamanho_y = TAMANHO_Y;
  
  colorIndex = 0;
  
  COLORS = [color(255, 255, 0), color(0, 255, 255), color(0, 0, 255)];
  
  
  rect(10, 10, TAMANHO_X, TAMANHO_Y);
}

function draw() {
  //background(220);
  
  
  // Pegar o menor lado
  // Criar o maximo de quadrados com esse lado
  // Repetir com o restante
  
  var menor_lado, maior_lado;
  if(tamanho_x < tamanho_y)
  {
    menor_lado = tamanho_x; 
    maior_lado = tamanho_y;
    
    tamanho_y = maior_lado % menor_lado;
    orient = 1;
  } else
  {
    menor_lado = tamanho_y;
    maior_lado = tamanho_x;
    
    tamanho_x = maior_lado % menor_lado;
    orient = 0;
  }
  
  // maior_lado / menor_lado // qtd quadrados
  var qtd_quadrados = parseInt(maior_lado / menor_lado);
  for(var i = 0; i < qtd_quadrados; i++)
  {
    fill(COLORS[colorIndex % 3]);
    rect(start_x + menor_lado * i * !orient, start_y + menor_lado * i * orient, menor_lado, menor_lado);    
  }
  
  start_x = start_x + qtd_quadrados * menor_lado * !orient;
  start_y = start_y + qtd_quadrados * menor_lado * orient;
  colorIndex++;

  
  
  //if(colorIndex < 10) alert();
  if (tamanho_x == 0) noLoop();
}
