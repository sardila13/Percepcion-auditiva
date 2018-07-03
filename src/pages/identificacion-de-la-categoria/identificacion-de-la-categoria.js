var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the IdentificacionDeLaCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IdentificacionDeLaCategoriaPage = /** @class */ (function () {
    //Functional methods
    function IdentificacionDeLaCategoriaPage(navCtrl, navParams) {
        /*this.selectWinnerCategory(1, this.setArrayCategory,
            this.selectWinnerPosition);*/
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        //SetUp methods en variables
        this.currentAudio = new Audio();
        this.dificultad = "facil";
        this.images = [];
        this.hide = [];
        this.winner = -1;
        this.categories = ["animalesDeLaGranja", "animalesDeLaSelva",
            "mediosDeTransporte", "instrumentosMusicales", "cosasDeLaCasa", "sonidosDelCuerpo"];
        this.buttons = [];
        //Finish tests
        for (var j = 0; j < 4; j++) {
            this.hide[j] = true;
        }
        this.rango = 1;
        this.selectWinnerCategory(1, this.setImages);
    }
    IdentificacionDeLaCategoriaPage.prototype.ionViewDidLoad = function () {
        this.buttons = [];
        for (var a = 0; a < 6; a++) {
            var btnActual = "btn" + a;
            var elbtn = document.getElementById(btnActual);
            elbtn.classList.add("imagenesFa");
            this.buttons.push(elbtn);
        }
        console.log("Winner " + this.winner);
    };
    IdentificacionDeLaCategoriaPage.prototype.ionViewWillLeave = function () {
        console.log(this.currentAudio);
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        console.log(this.currentAudio.currentTime);
    };
    IdentificacionDeLaCategoriaPage.prototype.selectImage = function (id) {
        if (this.winner === id) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            console.log("Ganaste");
            window.alert("Ganaste");
            this.selectWinnerCategory(this.rango, this.setImages);
        }
        else {
            console.log("Perdiste");
            window.alert("intentalo de nuevo");
        }
    };
    //Extra methods non related to the specific class
    IdentificacionDeLaCategoriaPage.prototype.randomNumber = function (max) {
        return Math.floor(Math.random() * (max + 1));
    };
    IdentificacionDeLaCategoriaPage.prototype.setClassImages = function (clase) {
        for (var b = 0; b < this.buttons.length; b++) {
            this.buttons[b].classList.add(clase);
        }
    };
    /*setImages(rango: number, categories: Array<String>){
      var image = "";
      for(var m = 0; m <= rango; m++){
          image = categories[m] + "/" + this.randomNumber(7) + ".jpg";
          if(this.images.indexOf(image) > -1) m--;
          else if(this.images.length > m) this.images[m] = image;
          else this.images.push(image);
      }
      
    }*/
    IdentificacionDeLaCategoriaPage.prototype.playSound = function () {
        this.currentAudio.pause();
        this.currentAudio.play();
    };
    IdentificacionDeLaCategoriaPage.prototype.playSoundParam = function (soundPath) {
        var sound = new Audio("assets/sounds/" + soundPath);
        this.currentAudio = sound;
    };
    IdentificacionDeLaCategoriaPage.prototype.changeDifficulty = function () {
        this.currentAudio.pause();
        this.hideImagenes();
        var clase = "";
        var rango = 1;
        if (this.dificultad === "facil") {
            rango = 1;
            clase = "imagenesFa";
        }
        else if (this.dificultad === "intermedio") {
            rango = 3;
            clase = "imagenesIntermedio";
        }
        else if (this.dificultad === "dificil") {
            rango = 5;
            clase = "imagenesDif";
        }
        this.rango = rango;
        /*this.selectWinnerCategory(rango, this.setArrayCategory, this.selectWinnerPosition);*/
        this.setClassImages(clase);
        this.selectWinnerCategory(rango, this.setImages);
    };
    IdentificacionDeLaCategoriaPage.prototype.hideImagenes = function () {
        if (this.dificultad === "facil") {
            for (var c = 0; c < 4; c++)
                this.hide[c] = true;
        }
        if (this.dificultad === "intermedio") {
            this.hide[0] = false;
            this.hide[1] = false;
            this.hide[2] = true;
            this.hide[3] = true;
        }
        if (this.dificultad === "dificil") {
            for (var ka = 0; ka < 4; ka++)
                this.hide[ka] = false;
        }
    };
    //Methods with game logic
    IdentificacionDeLaCategoriaPage.prototype.selectWinnerPosition = function (rango) {
        var winnerPosition = this.randomNumber(rango);
        this.winner = winnerPosition;
        return winnerPosition;
    };
    IdentificacionDeLaCategoriaPage.prototype.selectWinnerCategory = function (rango, functionSetImages) {
        var winnerCategory = this.randomNumber(5);
        var winnerPosition = this.selectWinnerPosition(rango);
        //console.log("Winner category " +  " " + this.categories[winnerCategory]);
        //console.log("Winner position " + winnerPosition);
        var winnerSound = functionSetImages(winnerPosition, winnerCategory, rango, this.randomNumber, this.images, this.categories);
        this.winnerSound = winnerSound;
        this.playSoundParam(winnerSound);
    };
    IdentificacionDeLaCategoriaPage.prototype.setImages = function (winnerPosition, winnerCategory, rango, functionRandom, images, categories) {
        var imageToAdd;
        var category;
        var winnerSound;
        for (var h = 0; h <= rango; h++) {
            if (h == winnerPosition) {
                var path = categories[winnerCategory] + "/" + functionRandom(5);
                imageToAdd = path + ".jpg";
                winnerSound = path + ".mp3";
            }
            else {
                category = functionRandom(5);
                imageToAdd = categories[category] + "/" + functionRandom(7) + ".jpg";
                if (category === winnerCategory || images.indexOf(imageToAdd) > -1)
                    h--;
            }
            if (h >= images.length)
                images.push(imageToAdd);
            else
                images[h] = imageToAdd;
        }
        return winnerSound;
    };
    IdentificacionDeLaCategoriaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-identificacion-de-la-categoria',
            templateUrl: 'identificacion-de-la-categoria.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], IdentificacionDeLaCategoriaPage);
    return IdentificacionDeLaCategoriaPage;
}());
export { IdentificacionDeLaCategoriaPage };
//# sourceMappingURL=identificacion-de-la-categoria.js.map