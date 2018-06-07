import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IdentificacionDeContextosOSituacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-identificacion-de-contextos-o-situaciones',
  templateUrl: 'identificacion-de-contextos-o-situaciones.html',
})
export class IdentificacionDeContextosOSituacionesPage {

	images: Array<String> = [];

	hide: Array<boolean> = [];

	buttons: Array<HTMLElement>;

	dificultad: String = "facil";

	winner: number;

	winnerSound: String;

	category: String = "situaciones";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	for(var j = 0; j < 5; j++){
    	this.hide[j] = true;
    }

    this.selectWinnerCategory(3, this.setImages);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdentificacionDeContextosOSituacionesPage');
    this.buttons = [];
  	for( var a = 0; a < 8; a++) {
  		var btnActual = "btn" + a;
  		var elbtn = document.getElementById(btnActual);
  		elbtn.classList.add("imagenesFa");
  		this.buttons.push(elbtn);
  	}
    this.playSound();
    console.log("Winner " +this.winner);
  }

  selectImage(id:number){	
  	if(this.winner === id){
  		console.log("Ganaste");
  	}
  	else{
  		console.log("Perdiste");
  	}
  }

  //Extra methods non related to the specific class

  randomNumber(max: number){
  	return Math.floor(Math.random() * (max + 1));
  }

  setClassImages(clase: string){
  	for(var b = 0; b < this.buttons.length; b++){
  		this.buttons[b].classList.add(clase);
  	}
  }

  playSound(){
    var sound = new Audio("assets/sounds/" + this.winnerSound);
    sound.play();
  }

  playSoundParam(soundPath:String){
    var sound = new Audio("assets/sounds/" + soundPath);
    sound.play();
  }

  changeDifficulty() {

  	this.hideImagenes();

  	var clase = "";
  	var rango = 1;
  	if(this.dificultad ==="facil"){
  		rango = 3;
  		clase = "imagenesFa";
  	}
  	else if(this.dificultad ==="intermedio"){
  		rango = 5;
  		clase = "imagenesIntermedio";
  	}
  	else if(this.dificultad ==="dificil"){
  		rango = 8;
  		clase = "imagenesDif";
  	}

  	/*this.selectWinnerCategory(rango, this.setArrayCategory, this.selectWinnerPosition);*/
  	this.setClassImages(clase);
  	this.selectWinnerCategory(rango, this.setImages);
  }

  hideImagenes(){
  	if(this.dificultad === "facil"){
  		for(var c = 0; c < 5; c++) this.hide[c] = true;
  	}
  	if(this.dificultad === "intermedio"){
		this.hide[0] = false;
  		this.hide[1] = false;
  		this.hide[2] = true;
  		this.hide[3] = true;
  		this.hide[4] = true;
  	}
  	if(this.dificultad === "dificil"){
  		for(var ka = 0; ka < 5; ka++) this.hide[ka] = false;
  	}
  }

  selectWinnerPosition(rango: number){
  	var winnerPosition = this.randomNumber(rango);
  	this.winner = winnerPosition;
    return winnerPosition;
  }

  selectWinnerCategory(rango : number, functionSetImages){
  	var winnerPosition = this.selectWinnerPosition(rango);
    //console.log("Winner category " +  " " + this.categories[winnerCategory]);
    //console.log("Winner position " + winnerPosition);
  	var winnerSound = functionSetImages(winnerPosition, this.category, rango, this.randomNumber, this.images);
    this.winnerSound = winnerSound;
    this.playSoundParam(winnerSound);
  }

  setImages(winnerPosition: number, category: number, rango: number, functionRandom, images:Array<string>){
    var imageToAdd : string;
    var winnerSound;
    for( var h = 0; h < rango; h++){
      if(h == winnerPosition){
        var path = category + "/" + functionRandom(5);
        imageToAdd = path + ".jpg";
        winnerSound = path + ".wav";
      }
      else{
        imageToAdd = category + "/" + functionRandom(7) + ".jpg";
        
        	
      }
      if(h >= images.length) images.push(imageToAdd);
     		else images[h] = imageToAdd;
      if(images.indexOf(imageToAdd) > -1) h--;
    }
    console.log(images);
    console.log(winnerSound);
    return winnerSound;
  }
}
