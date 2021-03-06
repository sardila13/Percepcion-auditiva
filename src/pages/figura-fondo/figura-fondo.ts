import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FiguraFondoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-figura-fondo',
  templateUrl: 'figura-fondo.html',
})
export class FiguraFondoPage {

  canWin : boolean = false;

  currentSounds : Array<HTMLAudioElement> = [];

	images: Array<String> = [];

	hide: Array<boolean> = [];

	buttons: Array<HTMLElement>;

	dificultad: String = "intermedio";

	winner: Array<number>;

	winnerSounds: Array<String> = [];

	rango: number;

	categories: Array<String> = ["animalesDeLaGranja","animalesDeLaSelva",
  	"mediosDeTransporte","instrumentosMusicales","cosasDeLaCasa","sonidosDelCuerpo"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    for(var j = 0; j < 2; j++){
    	this.hide[j] = true;
    }

    var rango = 4;
    this.rango = rango;
    this.selectWinner(rango, this.setImages);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiguraFondoPage');
    this.buttons = [];
  	for( var ax = 0; ax < 6; ax++) {
  		var btnActual = "btn" + ax;
  		var elbtn = document.getElementById(btnActual);
  		elbtn.classList.add("imagenesFa");
  		this.buttons.push(elbtn);
  	}

  }

  ionViewWillLeave(){
    for(var da = 0; da < this.currentSounds.length; da++){
      this.currentSounds[da].pause();
      this.currentSounds[da].currentTime = 0;
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
  	
  	if(this.dificultad === "intermedio"){
		this.hide[0] = true;
  		this.hide[1] = true;
  		 		
  	}
  	if(this.dificultad === "dificil"){
  		for(var ka = 0; ka < 2; ka++) this.hide[ka] = false;
  	}
  }

  changeDifficulty(){

    this.canWin = false;

    for(var xy = 0; xy < this.currentSounds.length; xy++){
      this.currentSounds[xy].pause();
    }

  	this.hideImagenes();

  	var clase = "";
  	var rango = 4;
  	if(this.dificultad ==="intermedio"){
  		rango = 3;
  		clase = "imagenesIntermedio";
  	}
  	else if(this.dificultad ==="dificil"){
  		rango = 5;
  		clase = "imagenesDif";
  	}
  	this.rango = rango
  	this.setClassImages(clase);
  	this.selectWinner(rango, this.setImages);
  }

  playSound(){
    this.canWin = true;
    for(var a = 0; a < this.currentSounds.length; a++){
      this.currentSounds[a].pause();
    }
  	for(var a = 0; a < this.winnerSounds.length; a++){
  		this.currentSounds[a].play();
  	}
  }

  playSoundParam(soundPath: Array<String>){
    this.currentSounds.splice(0, this.currentSounds.length);
    for(var a = 0; a < this.winnerSounds.length; a++){
  		var sound = new Audio("assets/sounds/" + soundPath[a]);
      this.currentSounds.push(sound);
  	}
  }

  selectImage(id:number){	
    if(this.canWin){
    	if(this.winner.indexOf (id)>-1){
        if(this.winner.length == 1){
          for(var xy = 0; xy < this.currentSounds.length; xy++){
            this.currentSounds[xy].pause();
          }
          window.alert("Ganaste");
          this.selectWinner(this.rango, this.setImages);
        }
        else{
      		console.log("encontraste uno");
          window.alert("Enocntraste uno");
      		this.winner.splice(this.winner.indexOf (id),1);
        }
    	}
    	else{
    		console.log("Fallaste");
        window.alert("intentalo de nuevo");
    	}
    }
  }

  selectWinnerPosition(rango: number){
  	var winners: Array<number> = [];
  	for(var i = 1; i <= rango/2; i++){
  		var winnerPosition = this.randomNumber(rango-1);
  		if(winners.indexOf(winnerPosition)>-1) i--;
  		else winners.push(winnerPosition);
  	}
  	this.winner = winners;
  	return winners;
  }

  selectWinner(rango:number,functionSetImages){
    this.canWin = false;
  	var winners = this.selectWinnerPosition(rango);
  	var winnerSounds = functionSetImages(winners, this.randomNumber, rango, this.images, this.categories);
  	this.setSound(winnerSounds);
  }

  setSound(sound: Array<String>){
    for(var dy = 0; dy < sound.length; dy++){
      this.winnerSounds[dy] = sound[dy];
    }
  	this.playSoundParam(this.winnerSounds);
  }

  setImages(winnersPositions:Array<number>, functionRandomNumber, rango:number, images:Array<String>, categories:Array<String>){
    images.splice(0, images.length);
  	var sounds: Array<String> = [];
  	for(var j = 0; j < rango; j++){
  		var categoria = functionRandomNumber(5);
  		var category = categories[categoria];
  		var image = functionRandomNumber(7)
  		var path = category + "/" + image;
  		if(images.indexOf(path + ".jpg")>-1) j--;
  		else{
	  		if(winnersPositions.indexOf(j)> -1){
	  			sounds.push(path + ".mp3");
	  		}
	  		if(j >= images.length) images.push(path + ".jpg");
	  		else images[j] = path + ".jpg";
  		}
  		
  	}
  	return sounds;
  }

}
