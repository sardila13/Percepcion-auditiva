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
 * Generated class for the FiguraFondoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FiguraFondoPage = /** @class */ (function () {
    function FiguraFondoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.canWin = false;
        this.currentSounds = [];
        this.images = [];
        this.hide = [];
        this.dificultad = "intermedio";
        this.winnerSounds = [];
        this.categories = ["animalesDeLaGranja", "animalesDeLaSelva",
            "mediosDeTransporte", "instrumentosMusicales", "cosasDeLaCasa", "sonidosDelCuerpo"];
        for (var j = 0; j < 2; j++) {
            this.hide[j] = true;
        }
        var rango = 4;
        this.rango = rango;
        this.selectWinner(rango, this.setImages);
    }
    FiguraFondoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FiguraFondoPage');
        this.buttons = [];
        for (var a = 0; a < 6; a++) {
            var btnActual = "btn" + a;
            var elbtn = document.getElementById(btnActual);
            elbtn.classList.add("imagenesFa");
            this.buttons.push(elbtn);
        }
    };
    FiguraFondoPage.prototype.ionViewWillLeave = function () {
        for (var da = 0; da < this.currentSounds.length; da++) {
            this.currentSounds[da].pause();
            this.currentSounds[da].currentTime = 0;
        }
    };
    FiguraFondoPage.prototype.setClassImages = function (clase) {
        for (var b = 0; b < this.buttons.length; b++) {
            this.buttons[b].classList.add(clase);
        }
    };
    FiguraFondoPage.prototype.randomNumber = function (max) {
        return Math.floor(Math.random() * (max + 1));
    };
    FiguraFondoPage.prototype.hideImagenes = function () {
        if (this.dificultad === "intermedio") {
            this.hide[0] = true;
            this.hide[1] = true;
        }
        if (this.dificultad === "dificil") {
            for (var ka = 0; ka < 2; ka++)
                this.hide[ka] = false;
        }
    };
    FiguraFondoPage.prototype.changeDifficulty = function () {
        this.canWin = false;
        for (var xy = 0; xy < this.currentSounds.length; xy++) {
            this.currentSounds[xy].pause();
        }
        this.hideImagenes();
        var clase = "";
        var rango = 4;
        if (this.dificultad === "intermedio") {
            rango = 4;
            clase = "imagenesIntermedio";
        }
        else if (this.dificultad === "dificil") {
            rango = 6;
            clase = "imagenesDif";
        }
        this.rango = rango;
        this.setClassImages(clase);
        this.selectWinner(rango, this.setImages);
    };
    FiguraFondoPage.prototype.playSound = function () {
        this.canWin = true;
        for (var a = 0; a < this.currentSounds.length; a++) {
            this.currentSounds[a].pause();
        }
        for (var a = 0; a < this.winnerSounds.length; a++) {
            this.currentSounds[a].play();
        }
    };
    FiguraFondoPage.prototype.playSoundParam = function (soundPath) {
        this.currentSounds.splice(0, this.currentSounds.length);
        for (var a = 0; a < this.winnerSounds.length; a++) {
            var sound = new Audio("assets/sounds/" + soundPath[a]);
            this.currentSounds.push(sound);
        }
    };
    FiguraFondoPage.prototype.selectImage = function (id) {
        if (this.canWin) {
            if (this.winner.indexOf(id) > -1) {
                if (this.winner.length == 1) {
                    for (var xy = 0; xy < this.currentSounds.length; xy++) {
                        this.currentSounds[xy].pause();
                    }
                    window.alert("Ganaste");
                    this.selectWinner(this.rango, this.setImages);
                }
                else {
                    console.log("encontraste uno");
                    window.alert("Enocntraste uno");
                    this.winner.splice(this.winner.indexOf(id), 1);
                }
            }
            else {
                console.log("Fallaste");
                window.alert("intentalo de nuevo");
            }
        }
    };
    FiguraFondoPage.prototype.selectWinnerPosition = function (rango) {
        var winners = [];
        for (var i = 1; i <= rango / 2; i++) {
            var winnerPosition = this.randomNumber(rango - 1);
            if (winners.indexOf(winnerPosition) > -1)
                i--;
            else
                winners.push(winnerPosition);
        }
        this.winner = winners;
        return winners;
    };
    FiguraFondoPage.prototype.selectWinner = function (rango, functionSetImages) {
        this.canWin = false;
        var winners = this.selectWinnerPosition(rango);
        var winnerSounds = functionSetImages(winners, this.randomNumber, rango, this.images, this.categories);
        this.setSound(winnerSounds);
    };
    FiguraFondoPage.prototype.setSound = function (sound) {
        for (var dy = 0; dy < sound.length; dy++) {
            this.winnerSounds[dy] = sound[dy];
        }
        this.playSoundParam(this.winnerSounds);
    };
    FiguraFondoPage.prototype.setImages = function (winnersPositions, functionRandomNumber, rango, images, categories) {
        images.splice(0, images.length);
        var sounds = [];
        for (var j = 0; j < rango; j++) {
            var categoria = functionRandomNumber(5);
            var category = categories[categoria];
            var image = functionRandomNumber(7);
            var path = category + "/" + image;
            if (images.indexOf(path + ".jpg") > -1)
                j--;
            else {
                if (winnersPositions.indexOf(j) > -1) {
                    sounds.push(path + ".mp3");
                }
                if (j >= images.length)
                    images.push(path + ".jpg");
                else
                    images[j] = path + ".jpg";
            }
        }
        return sounds;
    };
    FiguraFondoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-figura-fondo',
            templateUrl: 'figura-fondo.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], FiguraFondoPage);
    return FiguraFondoPage;
}());
export { FiguraFondoPage };
//# sourceMappingURL=figura-fondo.js.map