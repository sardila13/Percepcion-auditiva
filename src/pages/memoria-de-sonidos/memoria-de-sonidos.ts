import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MemoriaDeSonidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-memoria-de-sonidos',
  templateUrl: 'memoria-de-sonidos.html',
})

export class MemoriaDeSonidosPage {

	images: Array<String> = [];

	sounds:Array<string> = [];

	hide: Array<boolean> = [];

	buttons: Array<HTMLElement>;

	dificultad: String = "facil";

	winner: Array<number>;

  rango: number = 3;

  index : number;

	categories: Array<String> = ["animalesDeLaGranja","animalesDeLaSelva",
  	"mediosDeTransporte","instrumentosMusicales","cosasDeLaCasa","sonidosDelCuerpo"];

  	category: String = this.categories[0];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	for(var j = 0; j < 4; j++){
    	this.hide[j] = true;
    }

    var rango = 3;

    this.setImagesAndPositions(rango);
  }

  ionViewDidLoad() {
    this.buttons = [];
  	for( var a = 0; a < 8; a++) {
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
  	var indexOfPosition = this.winner.indexOf(id);
    console.log(indexOfPosition);
  	if(indexOfPosition > -1){
      var path = this.images[id].split(".jpg")[0] + ".mp3";
      
      this.sounds.splice(this.sounds.indexOf(path),1);
  		this.winner.splice(indexOfPosition,1);

  		if(this.winner.length === 0)console.log("Ganaste");
      else console.log("Sacaste uno");
  	}
  	else{
  		console.log("Fallaste");
  	}
  }

  changeDifficulty(){

  	this.hideImagenes();
    this.sounds = [];

  	var clase = "";
  	var rango = 3;
  	if(this.dificultad ==="facil"){
  		rango = 3;
  		clase = "imagenesFa";
  	}
  	else if(this.dificultad ==="intermedio"){
  		rango = 5;
  		clase = "imagenesIntermedio";
  	}
  	else if(this.dificultad ==="dificil"){
  		rango = 7;
  		clase = "imagenesDif";
  	}
  	this.setClassImages(clase);
    this.setImagesAndPositions(rango);
  }

  changeCategory(id: number){
    this.changeDifficulty();
  }


  playSound(){
    console.log("Play sound");
    console.log(this.sounds);
    this.index -1;
    this.playArraySounds();
  }

  playArraySounds(){
    this.index++;;
    if(this.index === this.sounds.length) return;
    var audio = new Audio("assets/sounds/" + this.sounds[this.index]);
    audio.addEventListener('ended', ()=> this.playArraySounds);
    audio.play();
  }

  setImagesAndPositions(rango: number){
  	var winnerPositions =  this.setWinnersPositions(rango, this.randomNumber);
    var sounds = this.setImages(winnerPositions, this.randomNumber, rango, this.images, this.category, this.sounds);
    this.playSoundParam(sounds);
  }

  playSoundParam(sounds: Array<String>){
    console.log("Play sound");
    console.log(this.sounds);
    this.index -1;
    this.playArraySoundsParam(sounds);
  }

  playArraySoundsParam(arraySounds: Array<String>){
    this.index++;;
    if(this.index === this.sounds.length) return;
    var audio = new Audio("assets/sounds/" + arraySounds[this.index]);
    audio.addEventListener('ended', ()=> this.playArraySounds);
    audio.play();
  }

  setWinnersPositions(rango: number, functionRandomNumber){
    var winnerPositions: Array<number> = [];
  	for(var i = 0; i <= rango-2; i++){
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
