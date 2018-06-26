import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MemoriaDeSonidosEnSecuenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-memoria-de-sonidos-en-secuencia',
  templateUrl: 'memoria-de-sonidos-en-secuencia.html',
})
export class MemoriaDeSonidosEnSecuenciaPage {

  images: Array<String> = [];

	sounds:Array<string> = [];

	hide: Array<boolean> = [];

	buttons: Array<HTMLElement>;

  encontrados: number;

	dificultad: String = "facil";

	winner: Array<number>;

	rango: number = 1;

	index : number;

	categories: Array<String> = ["animalesDeLaGranja","animalesDeLaSelva",
  	"mediosDeTransporte","instrumentosMusicales","cosasDeLaCasa","sonidosDelCuerpo"];

  	category: String = this.categories[0];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	for(var j = 0 ; j < 4; j++){
    	this.hide[j] = true;
    }

    var rango = 1;

    this.setImagesAndPositions(rango);
  }

  ionViewDidLoad() {
    this.buttons = [];
  	for( var a = 0; a < 6; a++) {
  		var btnActual = "btn" + a;
  		var elbtn = document.getElementById(btnActual);
  		elbtn.classList.add("imagenesFa");
  		this.buttons.push(elbtn);
  	}

  	this.playSound();

  }

  setClassImages(clase: string){
  	for(var b = 0; b < this.buttons.length; b++){
  		this.buttons[b].classList.add(clase);
  	}
  }

  randomNumber(max: number){
  	return Math.floor(Math.random() * (max + 1));
  }


  hideImagenes(){
  	if(this.dificultad === "facil"){
  		for(var c = 0; c < 4; c++) this.hide[c] = true;
  	}
  	if(this.dificultad === "intermedio"){
		this.hide[0] = false;
  		this.hide[1] = false;
  		this.hide[2] = true;
  		this.hide[3] = true;
  	}
  	if(this.dificultad === "dificil"){
  		for(var ka = 0; ka < 4; ka++) this.hide[ka] = false;
  	}
  }

  selectImage(id:number){
    console.log(this.encontrados);
    console.log(this.winner.length);
    console.log(this.winner);
  	var indexOfPosition = this.winner.indexOf(id);
  	if(indexOfPosition > -1){

  		if(this.encontrados === this.winner.length -1){
        console.log("Ganaste");
        window.alert("Ganaste");
      }
      else {
        console.log("Sacaste uno");
        this.encontrados++;
      }
  	}
  	else{
  		console.log("Fallaste");
      this.encontrados = 0;
  	}
  }

  changeDifficulty(){

  	this.hideImagenes();
    this.sounds = [];

  	var clase = "";
  	var rango = 1;
  	if(this.dificultad ==="facil"){
  		rango = 1;
  		clase = "imagenesFa";
  	}
  	else if(this.dificultad ==="intermedio"){
  		rango = 3;
  		clase = "imagenesIntermedio";
  	}
  	else if(this.dificultad ==="dificil"){
  		rango = 5;
  		clase = "imagenesDif";
  	}
    this.rango = rango;
  	this.setClassImages(clase);
    this.setImagesAndPositions(rango);
  }

  changeCategory(id: number){
    this.changeDifficulty();
  }


  playSound(){
    this.index = -1;
    this.playArraySounds();
  }

  playArraySounds(){
    this.index++;;
    if(this.index === this.sounds.length) return;
    var audio = new Audio("assets/sounds/" + this.sounds[this.index]);
    audio.play();
    audio.addEventListener('ended', ()=> this.playArraySounds());
  }

  setImagesAndPositions(rango: number){
  	var winnerPositions =  this.setWinnersPositions(rango, this.randomNumber);
    var sounds = this.setImages(winnerPositions, this.randomNumber, rango, this.images, this.category, this.sounds);
    console.log(sounds)
    this.encontrados = 0;
    this.playSoundParam(sounds);
  }

  playSoundParam(sounds: Array<String>){
    this.index = -1;
    this.playArraySoundsParam(sounds);
  }

  playArraySoundsParam(arraySounds: Array<String>){
    this.index++;;
    if(this.index === this.sounds.length) return;
    var audio = new Audio("assets/sounds/" + arraySounds[this.index]);
    audio.play();
    audio.addEventListener('ended', ()=> this.playArraySounds());
  }

  setWinnersPositions(rango: number, functionRandomNumber){
    var winnerPositions: Array<number> = [];
  	for(var i = 0; i <= rango; i++){
  		var winnerPosition = functionRandomNumber(rango);
      if(winnerPositions.indexOf(winnerPosition)> -1 ) i--;
  		else winnerPositions.push(winnerPosition);
  	}
    this.winner = winnerPositions;
    return winnerPositions;
  }

  setImages(winnerPositions: Array<number>, functionRandomNumber, rango: number, images: Array<String>, category: String, winnerSounds: Array<String>){
    var positionSound = 0;
  	for(var x = 0; x <= rango; x++){
      var path = category + "/" + functionRandomNumber(7);
      var image = path + ".jpg";
      if(images.indexOf(image) > -1) x--;
      else{
        if(winnerPositions.indexOf(x)>-1){
          winnerSounds[positionSound++] = path + ".mp3";
        }
        if(x >= images.length) images.push(path + ".jpg");
          else images[x] = path + ".jpg";

      }
    }
    return winnerSounds;
  }

}
