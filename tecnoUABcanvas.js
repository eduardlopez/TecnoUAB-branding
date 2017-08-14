//_____________________________________________________________________
//
//  Created by: Eduard López -> @eduardlopez
//              blog: eduardlopez.com
// 
//  Eres libre de copiar lo que quieras de este sketch 
//  pero bajo CREATIVE COMMONS ATTRIBUTION 3.0 UNPORTED (CC BY 3.0)
//  http://creativecommons.org/licenses/by/3.0/es/
//  You are free to copy what you want of this sketch
//  but under CREATIVE COMMONS ATTRIBUTION 3.0 UNPORTED (CC BY 3.0)
//  http://creativecommons.org/licenses/by/3.0/
//_____________________________________________________________________


// Variables globales
int tamPantalla = 200;
int margen = 10;
int nParticulas = 5;
int tamParticula = 11;
int tamLinea = 3;
int distanciaMinimaConexionParticulas = 200;
cParticula[] particulas = new cParticula[nParticulas];
int t=0;
color colorLinea;


void setup() {
  frameRate(30);
  smooth();
  size(tamPantalla, tamPantalla);
  for (int i=0; i<particulas.length; i++) { 
    particulas[i] = new cParticula();
  }
}

void draw() {

  if ( mousePressed == true ) {
    fill(0, 40); 
    rect(0, 0, width, height);
    // background(255);
    distanciaMinimaConexionParticulas = 0;
  }
  else {
    background(255);
    distanciaMinimaConexionParticulas = 200;
  }


  for ( int i=0; i<particulas.length; i++) {
    if ( mousePressed == true ) { 
      particulas[i].actualizarPosicionConRuido();
    } 
    else { 
      particulas[i].actualizarPosicion();
    }
  }

  for ( int i=0; i<particulas.length; i++) {
    strokeWeight(tamLinea);
    colorLinea = color(int(sin(0.03*t*i + 0) * 127 + 128), int(sin(0.03*t*i + 2) * 127 + 128), int(sin(0.03*t*i + 4) * 127 + 128));
    stroke( colorLinea );
    particulas[i].actualizarColor(colorLinea);
    for ( int j=0; j<particulas.length; j++) {
      if ( dist(particulas[i].getX(), particulas[i].getY(), particulas[j].getX(), particulas[j].getY()) < distanciaMinimaConexionParticulas ) {
        line(particulas[i].getX(), particulas[i].getY(), particulas[j].getX(), particulas[j].getY());
      }
    }
  }

  if ( t<30000 ) { 
    t++;
  } 
  else { 
    t=0;
  }

  for ( int i=0; i<particulas.length; i++) { 
    particulas[i].dibujar();
  }
}



void mouseReleased() {
  for ( int i=0; i<particulas.length; i++) { 
    particulas[i].inicializarDireccion();
  }
}


class cParticula {
  float x, y;
  float dirX, dirY; 
  color colorActual; // Guarda un color para si se solicita para dibujar una línea

  // CONSTRUCTOR
  cParticula() {
    x = random(margen, tamPantalla-margen);
    y = random(margen, tamPantalla-margen);
    inicializarDireccion();
  }

  // ACTUALIZAR EL COLOR DE LA LÍNEA
  void actualizarColor(color nuevoColor) {
    colorActual = nuevoColor;
  }

  // ACTUALIZAR LA POSICIÓN
  void actualizarPosicion() {
    if ( (x>=tamPantalla-margen) || (x<=margen) ) {
      dirX = dirX * -1;
      if (x>=tamPantalla-margen) {
        x = tamPantalla-margen;
      }
      else {
        x = margen;
      }
    }
    if ( (y>=tamPantalla-margen) || (y<=margen) ) {
      dirY = dirY * -1;
      if (y>=tamPantalla-margen) {
        y = tamPantalla-margen;
      }
      else {
        y = margen;
      }
    }  
    x = x + dirX;
    y = y + dirY;
  }

  void actualizarPosicionConRuido() {
    dirX += random(2.0) - 1.0;
    dirX *= .96;
    dirY += random(2.0) - 1.0;
    dirY *= .96;
    actualizarPosicion();
  }

  void inicializarDireccion() {
    dirX = random(-5, 5);
    dirY = random(-5, 5);
  }

  // OBTENER POSICIONES
  float getX() { 
    return x;
  }
  float getY() { 
    return y;
  }


  // DIBUJAR PUNTO
  void dibujar() {
    noStroke();
    fill(colorActual);
    ellipse(x, y, tamParticula, tamParticula);
  }
}

