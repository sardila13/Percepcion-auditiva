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


//SetUp methods en variables

  dificultad : String = "facil";

  images : Array<String> = [];

  hide:Array<boolean> = [];

  winner: number = -1;

  winnerSound: String;

  categories: Array<String> = ["animalesDeLaGranja","animalesDeLaSelva",
  	"mediosDeTransporte","instrumentosMusicales","cosasDeLaCasa","sonidosDelCuerpo"];

  buttons: Array<HTMLElement> = [];

  //Functional methods

  constructor(public navCtrl: NavController, public navParams: NavParams) {


  	/*this.selectWinnerCategory(1, this.setArrayCategory, 
  		this.selectWinnerPosition);*/

  	//Finish tests

    for(var j = 0; j < 4; j++){
    	this.hide[j] = true;
    }

    this.selectWinnerCategory(1, this.setImages);

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

  /*setImages(rango: number, categories: Array<String>){
  	var image = "";
  	for(var m = 0; m <= rango; m++){
  		image = categories[m] + "/" + this.randomNumber(7) + ".png";
  		if(this.images.indexOf(image) > -1) m--;	
  		else if(this.images.length > m) this.images[m] = image;
  		else this.images.push(image);
  	}
  	
  }*/

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

  	/*this.selectWinnerCategory(rango, this.setArrayCategory, this.selectWinnerPosition);*/
  	this.setClassImages(clase);
  	this.selectWinnerCategory(rango, this.setImages);
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



  //Methods with game logic

  selectWinnerPosition(rango: number){
  	var winnerPosition = this.randomNumber(rango);
  	this.winner = winnerPosition;
    return winnerPosition;
  }

  selectWinnerCategory(rango : number, functionSetImages){
  	var winnerCategory = this.randomNumber(5);
  	var winnerPosition = this.selectWinnerPosition(rango);
    //console.log("Winner category " +  " " + this.categories[winnerCategory]);
    //console.log("Winner position " + winnerPosition);
  	var winnerSound = functionSetImages(winnerPosition, winnerCategory, rango, this.randomNumber, this.images, this.categories);
    this.winnerSound = winnerSound;
    this.playSoundParam(winnerSound);
  }

  setImages(winnerPosition: number, winnerCategory: number, rango: number, functionRandom, images:Array<string>, categories:Array<string>){
    var imageToAdd : string;
    var category : number;
    var winnerSound;
    for( var h = 0; h <= rango; h++){
      if(h == winnerPosition){
        var path = categories[winnerCategory] + "/" + functionRandom(5);
        imageToAdd = path + ".png";
        winnerSound = path + ".mp3";
      }
      else{
        category = functionRandom(5);
        imageToAdd = categories[category] + "/" + functionRandom(7) + ".png";
        if(category === winnerCategory || images.indexOf(imageToAdd) > -1) h--;

      }
      if(h >= images.length) images.push(imageToAdd);
      else images[h] = imageToAdd;

    }
    return winnerSound;
  }

}