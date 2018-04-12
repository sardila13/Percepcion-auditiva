import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IdentificacionDeLaCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-identificacion-de-la-categoria',
  templateUrl: 'identificacion-de-la-categoria.html',
})
export class IdentificacionDeLaCategoriaPage {

  dificultad : String;

  imagenes : Array<String>;

  ocultar:Array<boolean>;

  rango: number;

  winner: number;

  imgClass:String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.dificultad = "facil";
  	this.imagenes = [];
  	this.ocultar = [];
  	for(var i = 0; i < 6; i ++){
    	this.imagenes[i]  ="granja";
    }
    for(var j = 0; j < 4; j++){
    	this.ocultar[j] = true;
    }
  }

  ionViewDidLoad() {
    
    this.rango = 3;

    this.winner = -1;

    this.cambioDificultad();
  }

  cambioDificultad() {
  	this.ocultarImagenes();
  	var btnes = [];
  	//var imgnes = [];
  	for( var i = 0; i < 6; i++) {
  		var btnActual = "btn" + i;
  		console.log(btnActual);
  		//var imgActual = "img" + i;
  		var elbtn = document.getElementById(btnActual);
  		//var elimg = document.getElementById(imgActual);
  		btnes.push(elbtn);
  		//imgnes.push(elimg);
  	}

  	if(this.dificultad ==="facil"){
  		var imagen = "granja";
  		this.imgClass = "imagenesFa"
  		for(var j = 0; j < btnes.length; j++){
  			btnes[j].classList.add('imagenesFa');
  			if(j < 4) this.imagenes[j] = imagen;
   		}
   		this.rango = 3;
   		this.seleccionarGanador();
  	}
  	console.log(this.dificultad);
  	if(this.dificultad ==="intermedio"){
  		var imagen = "granja";
  		this.imgClass = "imagenesIntermedio";
  		for(var k = 0; k < btnes.length; k++){
  			btnes[k].classList.add('imagenesFa');
  			if(k < 6) this.imagenes[k] = imagen;
  		}
   		this.rango = 5;
   		this.seleccionarGanador();
  	}
  	if(this.dificultad ==="dificil"){
  		var imagen = "granja";
  		this.imgClass = "imagenesDif";
  		for(var k = 0; k < btnes.length; k++){
  			btnes[k].classList.add('imagenesDif');	
  			this.imagenes[k] = imagen;
  		}
   		this.rango = 7;
   		this.seleccionarGanador();
  	}  	
  }

  ocultarImagenes(){
  	if(this.dificultad === "facil"){
  		for(var j = 0; j < 4; j++) this.ocultar[j] = true;
  	}
  	if(this.dificultad === "intermedio"){
		this.ocultar[0] = false;
  		this.ocultar[1] = false;
  		this.ocultar[2] = true;
  		this.ocultar[3] = true;  		
  	}
  	if(this.dificultad === "dificil"){
  		for(var i = 0; i < 4; i++) this.ocultar[i] = false;
  	}
  }

  seleccionarGanador(){
  	this.winner = this.numeroRandom(this.rango);
  }
  seleccionarImagen(id:number){
  	
  	if(this.winner === id){
  		console.log("Ganaste");
  	}
  	else{
  		console.log("Perdiste");
  	}
  }

  numeroRandom(max){
  	return Math.floor(Math.random() * (max + 1));
  }

}
