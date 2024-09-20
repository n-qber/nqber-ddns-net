const DELAY = 200;
var COLORS;

//const TAMANHO_X = 741;
//const TAMANHO_Y = 595;

//const TAMANHO_X = 595;
//const TAMANHO_Y = 425;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const TAMANHO_X = prompt("Coloque o comprimento do terreno (1-1300) ");
const TAMANHO_Y = prompt("Coloque a largura do terreno (1-760) ");

var tamanho_x;
var tamanho_y;

var colorIndex; 

var start_x = 10;
var start_y = 10;

var orient;

function setup() {
  createCanvas(window.screen.width, window.screen.height);
  //createCanvas(1366, 768);
  background(220);
  tamanho_x = TAMANHO_X;
  tamanho_y = TAMANHO_Y;
  
  colorIndex = 0;
  
  COLORS = [color(255, 255, 0), color(0, 255, 255), color(0, 0, 255), color(255, 142, 7), color(12, 34, 56), color(155, 0, 50)];
  
  
  rect(10, 10, TAMANHO_X, TAMANHO_Y);
  frameRate(1);

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
    fill(COLORS[colorIndex % COLORS.length]);
    //square(start_x + menor_lado * i * !orient, start_y + menor_lado * i * orient, menor_lado);    
	setTimeout(square, DELAY * i, start_x + menor_lado * i * !orient, start_y + menor_lado * i * orient, menor_lado);
  }
  
  start_x = start_x + qtd_quadrados * menor_lado * !orient;
  start_y = start_y + qtd_quadrados * menor_lado * orient;
  colorIndex++;

  
  
  //if(colorIndex < 10) alert();
  if (tamanho_x == 0 || tamanho_y == 0)
    {
		fill(color(0, 255, 0));
	const tamanho = parseInt(tamanho_x) + parseInt(tamanho_y);
		setTimeout(() => {
			textSize(40);
			text(tamanho + ' unidades de comprimento', 10, TAMANHO_Y + 50);
		  const DELAY_QUADRADOS = 2000 / ((TAMANHO_Y / tamanho) * (TAMANHO_X/ tamanho ));
		  for(var i = 0; i < (TAMANHO_Y / tamanho); i++)
		  {
			for(var j = 0; j < (TAMANHO_X / tamanho); j++)
			  {
				
				//fill(COLORS[colorIndex % COLORS.length]);
				//fill(color(0, 255, 0));
				setTimeout(square, DELAY_QUADRADOS * j + DELAY_QUADRADOS * (TAMANHO_X / tamanho) * i, 10 + tamanho * j, 10 + tamanho * i, tamanho);
				//colorIndex++;
			  }
		  }
		}, DELAY * qtd_quadrados);
	  noLoop();
    }
	else
	{
		noLoop();
		setTimeout(draw, DELAY * qtd_quadrados);
	}
}

