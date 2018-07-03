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

  canWin: boolean = false;

  currentSounds : Array<HTMLAudioElement> = [];

  images: Array<String> = [];

	sounds:Array<string> = [];

	hide: Array<boolean> = [];

	buttons: Array<HTMLElement>;

  encontrados: number = 0;

	dificultad: String = "facil";

	winner: Array<number>;

	rango: number = 1;

	index : number;

  soundsPositions: Array<number> = [0,1];

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

  ionViewWillLeave(){
    this.pauseSounds();
  }

  ionViewDidLoad() {
    this.buttons = [];
  	for( var a = 0; a < 6; a++) {
  		var btnActual = "btn" + a;
  		var elbtn = document.getElementById(btnActual);
  		elbtn.classList.add("imagenesFa");
  		this.buttons.push(elbtn);
  	}
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

  pauseSounds(){
    for(var xy = 0; xy < this.currentSounds.length; xy++){
          this.currentSounds[xy].pause();
          this.currentSounds[xy].currentTime = 0;
      
    }
  }

  selectImage(id:number){
    if(this.canWin){
      var sound = this.images[id].split(".jpg")[0] + ".mp3";
      if(this.sounds[this.encontrados] === sound){
        if(this.encontrados == this.sounds.length-1)
        {
          console.log("Ganaste");
          window.alert("Ganaste");
          this.changeDifficulty();
        }
        else{
          console.log("Encontraste uno");
          this.encontrados ++;
        }
        
      }
      else{
        this.encontrados = 0;
        window.alert("Intentalo de nuevo");
        console.log("Intenta de nuevo")
      } 
    }
  	
  }

  changeDifficulty(){

    this.canWin = false;

    this.pauseSounds();

  	this.hideImagenes();
    this.sounds = [];

  	var clase = "";
  	var rango = 1;
  	if(this.dificultad ==="facil"){
      this.soundsPositions = [0,1];
  		rango = 1;
  		clase = "imagenesFa";
  	}
  	else if(this.dificultad ==="intermedio"){
      this.soundsPositions = [0,1,2,3];
  		rango = 3;
  		clase = "imagenesIntermedio";
  	}
  	else if(this.dificultad ==="dificil"){
      this.soundsPositions = [0,1,2,3,4,5];
  		rango = 5;
  		clase = "imagenesDif";
  	}
    this.encontrados = 0;
    this.rango = rango;
  	this.setClassImages(clase);
    this.setImagesAndPositions(rango);
  }

  changeCategory(id: number){
    this.changeDifficulty();
  }


  playSound(){
    this.pauseSounds();
    this.index = -1;
    this.playArraySounds();
  }

  playArraySounds(){
    this.index++;;
    if(this.index === this.sounds.length){
      this.canWin = true;
      return;
    };
    var audio = new Audio("assets/sounds/" + this.sounds[this.index]);
    this.currentSounds[this.index] = audio;
    audio.play();
    audio.addEventListener('ended', ()=> this.playArraySounds());
  }

  setImagesAndPositions(rango: number){
    this.canWin = false;
  	var winnerPositions =  this.setWinnersPositions(rango, this.randomNumber);
    var sounds = this.setImages(winnerPositions, this.randomNumber, rango, this.images, this.category, this.sounds, this.soundsPositions);
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
    this.currentSounds[this.index] = audio;
    this.playArraySoundsParam(arraySounds);
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

  setImages(winnerPositions: Array<number>, functionRandomNumber, rango: number, images: Array<String>, category: String, winnerSounds: Array<String>,soundsPositions:Array<number>){
    images.splice(0, images.length);
    winnerSounds.splice(0, winnerSounds.length);
    for(var x = 0; x <= rango; x++){
      var path = category + "/" + functionRandomNumber(7);
      var image = path + ".jpg";
      if(images.indexOf(image) > -1) x--;
      else{
        if(x >= images.length) images.push(path + ".jpg");
        else images[x] = path + ".jpg";

      }
    }
    for(var dx = 0; dx < winnerPositions.length; dx++){

      var soundPosition: number = 0;
      if(soundsPositions.length > 1) soundPosition = functionRandomNumber(soundsPositions.length-1);
      var actualPosition = soundsPositions[soundPosition];
      winnerSounds[actualPosition] = images[winnerPositions[dx]].split(".jpg")[0] + ".mp3";
      soundsPositions.splice(soundsPositions.indexOf(actualPosition),1);
    }
    return winnerSounds;

  }

}
