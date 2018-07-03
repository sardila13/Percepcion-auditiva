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
 * Generated class for the IdentificacionDeContextosOSituacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IdentificacionDeContextosOSituacionesPage = /** @class */ (function () {
    function IdentificacionDeContextosOSituacionesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.canWin = false;
        this.currentSound = new Audio();
        this.images = [];
        this.hide = [];
        this.dificultad = "facil";
        this.category = "situaciones";
        for (var j = 0; j < 5; j++) {
            this.hide[j] = true;
        }
        this.rango = 3;
        this.selectWinnerCategory(3, this.setImages);
    }
    IdentificacionDeContextosOSituacionesPage.prototype.ionViewWillLeave = function () {
        this.currentSound.pause();
        this.currentSound.currentTime = 0;
    };
    IdentificacionDeContextosOSituacionesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IdentificacionDeContextosOSituacionesPage');
        this.buttons = [];
        for (var a = 0; a < 8; a++) {
            var btnActual = "btn" + a;
            var elbtn = document.getElementById(btnActual);
            elbtn.classList.add("imagenesFa");
            this.buttons.push(elbtn);
        }
        console.log("Winner " + this.winner);
    };
    IdentificacionDeContextosOSituacionesPage.prototype.selectImage = function (id) {
        if (this.winner === id) {
            this.currentSound.pause();
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
    IdentificacionDeContextosOSituacionesPage.prototype.randomNumber = function (max) {
        return Math.floor(Math.random() * (max + 1));
    };
    IdentificacionDeContextosOSituacionesPage.prototype.setClassImages = function (clase) {
        for (var b = 0; b < this.buttons.length; b++) {
            this.buttons[b].classList.add(clase);
        }
    };
    IdentificacionDeContextosOSituacionesPage.prototype.playSound = function () {
        this.canWin = true;
        this.currentSound.pause();
        this.currentSound.play();
    };
    IdentificacionDeContextosOSituacionesPage.prototype.playSoundParam = function (soundPath) {
        var sound = new Audio("assets/sounds/" + soundPath);
        return sound;
    };
    IdentificacionDeContextosOSituacionesPage.prototype.changeDifficulty = function () {
        this.currentSound.pause();
        this.hideImagenes();
        var clase = "";
        var rango = 1;
        if (this.dificultad === "facil") {
            rango = 3;
            clase = "imagenesFa";
        }
        else if (this.dificultad === "intermedio") {
            rango = 5;
            clase = "imagenesIntermedio";
        }
        else if (this.dificultad === "dificil") {
            console.log("Entra dificil");
            rango = 8;
            clase = "imagenesDif";
        }
        this.rango = rango;
        /*this.selectWinnerCategory(rango, this.setArrayCategory, this.selectWinnerPosition);*/
        this.setClassImages(clase);
        this.selectWinnerCategory(rango, this.setImages);
    };
    IdentificacionDeContextosOSituacionesPage.prototype.hideImagenes = function () {
        if (this.dificultad === "facil") {
            for (var c = 0; c < 5; c++)
                this.hide[c] = true;
        }
        if (this.dificultad === "intermedio") {
            this.hide[0] = false;
            this.hide[1] = false;
            this.hide[2] = true;
            this.hide[3] = true;
            this.hide[4] = true;
        }
        if (this.dificultad === "dificil") {
            for (var ka = 0; ka < 5; ka++)
                this.hide[ka] = false;
        }
        console.log(this.hide[4]);
    };
    IdentificacionDeContextosOSituacionesPage.prototype.selectWinnerPosition = function (rango) {
        var winnerPosition = this.randomNumber(rango - 1);
        this.winner = winnerPosition;
        return winnerPosition;
    };
    IdentificacionDeContextosOSituacionesPage.prototype.selectWinnerCategory = function (rango, functionSetImages) {
        var winnerPosition = this.selectWinnerPosition(rango);
        //console.log("Winner category " +  " " + this.categories[winnerCategory]);
        //console.log("Winner position " + winnerPosition);
        var winnerSound = functionSetImages(winnerPosition, this.category, rango, this.randomNumber, this.images);
        this.winnerSound = winnerSound;
        this.currentSound = this.playSoundParam(winnerSound);
    };
    IdentificacionDeContextosOSituacionesPage.prototype.setImages = function (winnerPosition, category, rango, functionRandom, images) {
        var imageToAdd;
        var numbers = ["0", "1", "2", "3", "4", "5", "6", "7"];
        var winnerSound;
        for (var h = 0; h < rango; h++) {
            var position = functionRandom(numbers.length - 1);
            var value = numbers[position];
            numbers.splice(position, 1);
            var path = category + "/" + value;
            imageToAdd = path + ".jpg";
            console.log(images + " " + path);
            console.log(numbers);
            if (h == winnerPosition)
                winnerSound = path + ".mp3";
            if (h >= images.length)
                images.push(imageToAdd);
            else
                images[h] = imageToAdd;
        }
        return winnerSound;
    };
    IdentificacionDeContextosOSituacionesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-identificacion-de-contextos-o-situaciones',
            templateUrl: 'identificacion-de-contextos-o-situaciones.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], IdentificacionDeContextosOSituacionesPage);
    return IdentificacionDeContextosOSituacionesPage;
}());
export { IdentificacionDeContextosOSituacionesPage };
//# sourceMappingURL=identificacion-de-contextos-o-situaciones.js.map