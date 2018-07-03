import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  canWin: boolean = false;

  currentSound: HTMLAudioElement = new Audio();

	images: Array<String> = [];

	hide: Array<boolean> = [];

	dificultad: String = "facil";

	buttons: Array<HTMLElement> = [];

	category: String;

	winner: number;

	winnerSound: String;

	rango: number = 2;

	categories: Array<String> = ["animalesDeLaGranja","animalesDeLaSelva",
  	"mediosDeTransporte","instrumentosMusicales","cosasDeLaCasa","sonidosDelCuerpo"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.category = this.categories[0];

    for(var j = 0; j < 5; j++){
    	this.hide[j] = true;
    }

    var rango = 2;

    this.selectWinner(rango, this.setImages);
  	
  }

  ionViewWillLeave(){
    console.log(this.currentSound);
    this.currentSound.pause();
  }

  ionViewDidLoad() {
    this.buttons;
  	for( var a = 0; a < 8; a++) {
  		var btnActual = "btn" + a;
  		var elbtn = document.getElementById(btnActual);
  		elbtn.classList.add("imagenesFa");
  		this.buttons.push(elbtn);
  	}
  }

  changeCategory(){
    this.canWin = false;
  	this.selectWinner(this.rango, this.setImages);
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

  changeDifficulty(){

    this.canWin = false;
    this.currentSound.pause();

  	this.hideImagenes();

  	var clase = "";
  	var rango = 1;
  	if(this.dificultad ==="facil"){
  		rango = 2;
  		clase = "imagenesFa";
  	}
  	else if(this.dificultad ==="intermedio"){
  		rango = 4;
  		clase = "imagenesIntermedio";
  	}
  	else if(this.dificultad ==="dificil"){
  		rango = 7;
  		clase = "imagenesDif";
  	}
  	this.rango = rango;
  	this.setClassImages(clase);
  	this.selectWinner(rango, this.setImages);
  }

  playSound(){
    this.canWin = true;
    this.currentSound.pause();
    this.currentSound.play();
  }

  playSoundParam(soundPath: String){
    var sound = new Audio("assets/sounds/" + soundPath);
    return sound;
  }

  selectImage(id:number){	
    if(this.canWin){
    	if(this.winner === id){
        this.currentSound.pause();
    		console.log("Ganaste");
        window.alert("Ganaste");
        this.selectWinner(this.rango, this.setImages);
    	}
    	else{
    		console.log("Perdiste");
        window.alert("intentalo de nuevo");
    	}
    }
  }

  selectWinnerPosition(rango: number){
  	var winnerPosition = this.randomNumber(rango);
  	this.winner = winnerPosition;
  	return winnerPosition;
  }

  selectWinner(rango:number,functionSetImages){
    this.canWin = false;
  	var winnerPosition = this.selectWinnerPosition(rango);
  	var winnerSound = functionSetImages(rango, winnerPosition, this.randomNumber, this.category, this.images);
  	this.setSound(winnerSound);
  }

  setSound(sound: String){
  	this.winnerSound = sound;
  	this.currentSound = this.playSoundParam(sound);
  }

  

  setImages(rango: number, winnerPosition: number, functionRandom, category: String, images:Array<String>){
  	var winnerSound;
    images.splice(0,images.length);

  	for(var i = 0; i <= rango; i++){
  		var path = category + "/" + functionRandom(7);
  		var image = path + ".jpg";
  		if(images.indexOf(image) > -1) i--;
  		else {
	  		if(i === winnerPosition) winnerSound = path + ".mp3"
	  		if(i >= images.length) images.push(path + ".jpg");
	  		else images[i] = path + ".jpg";
  		}
  	}
  	return winnerSound;
  }


}
