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

  currentSound = new Audio;

	images: Array<String> = [];

	hide: Array<boolean> = [];

	buttons: Array<HTMLElement>;

	dificultad: String = "facil";

	winner: number;

	winnerSound: String;

	category: String = "situaciones";

  rango: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	for(var j = 0; j < 5; j++){
    	this.hide[j] = true;
    }
    this.rango = 3;
    this.selectWinnerCategory(3, this.setImages);
  }

  ionViewDidLeave(){
    console.log("Entro");
    console.log(this.currentSound);
    this.currentSound.pause();
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
      this.currentSound . pause();
  		console.log("Ganaste");
      window.alert("Ganaste");
      this.selectWinnerCategory(this.rango, this.setImages);
  	}
  	else{
  		console.log("Perdiste");
      window.alert("intentalo de nuevo");
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
    return sound;
  }

  playSoundParam(soundPath:String){
    var sound = new Audio("assets/sounds/" + soundPath);
    sound.play();
    return sound;
  }

  changeDifficulty() {

    this.currentSound.pause();

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
      console.log("Entra dificil");
  		rango = 8;
  		clase = "imagenesDif";
  	}
    this.rango = rango;
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
    console.log(this.hide[4])
  }

  selectWinnerPosition(rango: number){
  	var winnerPosition = this.randomNumber(rango-1);
  	this.winner = winnerPosition;
    return winnerPosition;
  }

  selectWinnerCategory(rango : number, functionSetImages){
  	var winnerPosition = this.selectWinnerPosition(rango);
    //console.log("Winner category " +  " " + this.categories[winnerCategory]);
    //console.log("Winner position " + winnerPosition);
  	var winnerSound = functionSetImages(winnerPosition, this.category, rango, this.randomNumber, this.images);
    this.winnerSound = winnerSound;
    this.currentSound = this.playSoundParam(winnerSound);
  }

  setImages(winnerPosition: number, category: number, rango: number, functionRandom, images:Array<string>){
    var imageToAdd : string;
    var numbers = ["0","1","2","3","4","5","6","7"];

    var winnerSound;
    for(var h = 0; h < rango; h++){
      var position = functionRandom(numbers.length-1);
      var value = numbers[position];
      numbers.splice(position,1);
      var path = category + "/" + value;
      imageToAdd = path + ".jpg";
      console.log(images + " " + path);
      console.log(numbers);
      
      if(h == winnerPosition) winnerSound = path + ".mp3";
      if(h >= images.length) images.push(imageToAdd);
      else images[h] = imageToAdd;
      
      
    }
    return winnerSound;
  }
}
