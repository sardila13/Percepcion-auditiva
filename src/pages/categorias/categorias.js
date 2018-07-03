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
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CategoriasPage = /** @class */ (function () {
    function CategoriasPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.canWin = false;
        this.currentSound = new Audio();
        this.images = [];
        this.hide = [];
        this.dificultad = "facil";
        this.buttons = [];
        this.rango = 2;
        this.categories = ["animalesDeLaGranja", "animalesDeLaSelva",
            "mediosDeTransporte", "instrumentosMusicales", "cosasDeLaCasa", "sonidosDelCuerpo"];
        this.category = this.categories[0];
        for (var j = 0; j < 5; j++) {
            this.hide[j] = true;
        }
        var rango = 2;
        this.selectWinner(rango, this.setImages);
    }
    CategoriasPage.prototype.ionViewWillLeave = function () {
        console.log(this.currentSound);
        this.currentSound.pause();
    };
    CategoriasPage.prototype.ionViewDidLoad = function () {
        this.buttons;
        for (var a = 0; a < 8; a++) {
            var btnActual = "btn" + a;
            var elbtn = document.getElementById(btnActual);
            elbtn.classList.add("imagenesFa");
            this.buttons.push(elbtn);
        }
    };
    CategoriasPage.prototype.changeCategory = function () {
        this.canWin = false;
        this.selectWinner(this.rango, this.setImages);
    };
    CategoriasPage.prototype.setClassImages = function (clase) {
        for (var b = 0; b < this.buttons.length; b++) {
            this.buttons[b].classList.add(clase);
        }
    };
    CategoriasPage.prototype.randomNumber = function (max) {
        return Math.floor(Math.random() * (max + 1));
    };
    CategoriasPage.prototype.hideImagenes = function () {
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
    };
    CategoriasPage.prototype.changeDifficulty = function () {
        this.canWin = false;
        this.currentSound.pause();
        this.hideImagenes();
        var clase = "";
        var rango = 1;
        if (this.dificultad === "facil") {
            rango = 2;
            clase = "imagenesFa";
        }
        else if (this.dificultad === "intermedio") {
            rango = 4;
            clase = "imagenesIntermedio";
        }
        else if (this.dificultad === "dificil") {
            rango = 7;
            clase = "imagenesDif";
        }
        this.rango = rango;
        this.setClassImages(clase);
        this.selectWinner(rango, this.setImages);
    };
    CategoriasPage.prototype.playSound = function () {
        this.canWin = true;
        this.currentSound.pause();
        this.currentSound.play();
    };
    CategoriasPage.prototype.playSoundParam = function (soundPath) {
        var sound = new Audio("assets/sounds/" + soundPath);
        return sound;
    };
    CategoriasPage.prototype.selectImage = function (id) {
        if (this.canWin) {
            if (this.winner === id) {
                this.currentSound.pause();
                console.log("Ganaste");
                window.alert("Ganaste");
                this.selectWinner(this.rango, this.setImages);
            }
            else {
                console.log("Perdiste");
                window.alert("intentalo de nuevo");
            }
        }
    };
    CategoriasPage.prototype.selectWinnerPosition = function (rango) {
        var winnerPosition = this.randomNumber(rango);
        this.winner = winnerPosition;
        return winnerPosition;
    };
    CategoriasPage.prototype.selectWinner = function (rango, functionSetImages) {
        this.canWin = false;
        var winnerPosition = this.selectWinnerPosition(rango);
        var winnerSound = functionSetImages(rango, winnerPosition, this.randomNumber, this.category, this.images);
        this.setSound(winnerSound);
    };
    CategoriasPage.prototype.setSound = function (sound) {
        this.winnerSound = sound;
        this.currentSound = this.playSoundParam(sound);
    };
    CategoriasPage.prototype.setImages = function (rango, winnerPosition, functionRandom, category, images) {
        var winnerSound;
        images.splice(0, images.length);
        for (var i = 0; i <= rango; i++) {
            var path = category + "/" + functionRandom(7);
            var image = path + ".jpg";
            if (images.indexOf(image) > -1)
                i--;
            else {
                if (i === winnerPosition)
                    winnerSound = path + ".mp3";
                if (i >= images.length)
                    images.push(path + ".jpg");
                else
                    images[i] = path + ".jpg";
            }
        }
        return winnerSound;
    };
    CategoriasPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-categorias',
            templateUrl: 'categorias.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], CategoriasPage);
    return CategoriasPage;
}());
export { CategoriasPage };
//# sourceMappingURL=categorias.js.map