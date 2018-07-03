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
 * Generated class for the MemoriaDeSonidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MemoriaDeSonidosPage = /** @class */ (function () {
    function MemoriaDeSonidosPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.currentSounds = [];
        this.images = [];
        this.sounds = [];
        this.hide = [];
        this.dificultad = "facil";
        this.stopSounds = false;
        this.rango = 3;
        this.categories = ["animalesDeLaGranja", "animalesDeLaSelva",
            "mediosDeTransporte", "instrumentosMusicales", "cosasDeLaCasa", "sonidosDelCuerpo"];
        this.category = this.categories[0];
        for (var j = 0; j < 4; j++) {
            this.hide[j] = true;
        }
        var rango = 3;
        this.soundsPositions = [0, 1];
        this.setImagesAndPositions(rango);
    }
    MemoriaDeSonidosPage.prototype.ionViewWillLeave = function () {
        this.pauseSounds();
    };
    MemoriaDeSonidosPage.prototype.ionViewDidLoad = function () {
        this.buttons = [];
        for (var a = 0; a < 8; a++) {
            var btnActual = "btn" + a;
            var elbtn = document.getElementById(btnActual);
            elbtn.classList.add("imagenesFa");
            this.buttons.push(elbtn);
        }
    };
    MemoriaDeSonidosPage.prototype.setClassImages = function (clase) {
        for (var b = 0; b < this.buttons.length; b++) {
            this.buttons[b].classList.add(clase);
        }
    };
    MemoriaDeSonidosPage.prototype.randomNumber = function (max) {
        return Math.floor(Math.random() * (max + 1));
    };
    MemoriaDeSonidosPage.prototype.hideImagenes = function () {
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
    MemoriaDeSonidosPage.prototype.selectImage = function (id) {
        var indexOfPosition = this.winner.indexOf(id);
        console.log(indexOfPosition);
        if (indexOfPosition > -1) {
            this.winner.splice(indexOfPosition, 1);
            if (this.winner.length === 0) {
                this.pauseSounds();
                console.log("Ganaste");
                window.alert("Ganaste");
                this.changeDifficulty();
            }
            else {
                console.log("Sacaste uno");
                window.alert("Encontraste uno");
            }
        }
        else {
            console.log("Fallaste");
            window.alert("intentalo de nuevo");
        }
    };
    MemoriaDeSonidosPage.prototype.changeDifficulty = function () {
        this.pauseSounds();
        this.hideImagenes();
        this.sounds = [];
        var clase = "";
        var rango = 3;
        if (this.dificultad === "facil") {
            rango = 3;
            clase = "imagenesFa";
            this.soundsPositions = [0, 1];
        }
        else if (this.dificultad === "intermedio") {
            rango = 5;
            clase = "imagenesIntermedio";
            this.soundsPositions = [0, 1, 2, 3];
        }
        else if (this.dificultad === "dificil") {
            rango = 7;
            clase = "imagenesDif";
            this.soundsPositions = [0, 1, 2, 3, 4, 5];
        }
        this.rango = rango;
        this.setClassImages(clase);
        this.setImagesAndPositions(rango);
    };
    MemoriaDeSonidosPage.prototype.changeCategory = function (id) {
        this.changeDifficulty();
    };
    MemoriaDeSonidosPage.prototype.playSound = function () {
        this.pauseSounds();
        this.index = -1;
        this.playArraySounds();
    };
    MemoriaDeSonidosPage.prototype.pauseSounds = function () {
        this.stopSounds = true;
        console.log(this.currentSounds);
        for (var xy = 0; xy < this.currentSounds.length; xy++) {
            this.currentSounds[xy].currentTime = 0;
            this.currentSounds[xy].pause();
        }
    };
    MemoriaDeSonidosPage.prototype.playArraySounds = function () {
        var _this = this;
        this.index++;
        if (this.index === this.sounds.length)
            return;
        var audio = new Audio("assets/sounds/" + this.sounds[this.index]);
        this.currentSounds[this.index] = audio;
        audio.addEventListener('ended', function () { return _this.playArraySounds(); });
        audio.play();
    };
    MemoriaDeSonidosPage.prototype.setImagesAndPositions = function (rango) {
        var winnerPositions = this.setWinnersPositions(rango, this.randomNumber);
        var sounds = this.setImages(winnerPositions, this.randomNumber, rango, this.images, this.category, this.sounds, this.soundsPositions);
        this.playSoundParam(sounds);
    };
    MemoriaDeSonidosPage.prototype.playSoundParam = function (sounds) {
        this.stopSounds = false;
        this.index = -1;
        this.playArraySoundsParam(sounds);
    };
    MemoriaDeSonidosPage.prototype.playArraySoundsParam = function (arraySounds) {
        if (!this.stopSounds) {
            this.index++;
            if (this.index === this.sounds.length)
                return;
            var audio = new Audio("assets/sounds/" + arraySounds[this.index]);
            this.currentSounds[this.index] = audio;
            this.playArraySoundsParam(arraySounds);
        }
    };
    MemoriaDeSonidosPage.prototype.setWinnersPositions = function (rango, functionRandomNumber) {
        var winnerPositions = [];
        for (var i = 0; i <= rango - 2; i++) {
            var winnerPosition = functionRandomNumber(rango);
            if (winnerPositions.indexOf(winnerPosition) > -1)
                i--;
            else
                winnerPositions.push(winnerPosition);
        }
        this.winner = winnerPositions;
        return winnerPositions;
    };
    MemoriaDeSonidosPage.prototype.setImages = function (winnerPositions, functionRandomNumber, rango, images, category, winnerSounds, soundsPositions) {
        images.splice(0, images.length);
        winnerSounds.splice(0, winnerSounds.length);
        for (var x = 0; x <= rango; x++) {
            var path = category + "/" + functionRandomNumber(7);
            var image = path + ".jpg";
            if (images.indexOf(image) > -1)
                x--;
            else {
                if (x >= images.length)
                    images.push(path + ".jpg");
                else
                    images[x] = path + ".jpg";
            }
        }
        for (var dx = 0; dx < winnerPositions.length; dx++) {
            var soundPosition = 0;
            if (soundsPositions.length > 1)
                soundPosition = functionRandomNumber(soundsPositions.length - 1);
            winnerSounds[soundsPositions[soundPosition]] = images[winnerPositions[dx]].split(".jpg")[0] + ".mp3";
            soundsPositions.splice(soundsPositions.indexOf(soundPosition), 1);
        }
        return winnerSounds;
    };
    MemoriaDeSonidosPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-memoria-de-sonidos',
            templateUrl: 'memoria-de-sonidos.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], MemoriaDeSonidosPage);
    return MemoriaDeSonidosPage;
}());
export { MemoriaDeSonidosPage };
//# sourceMappingURL=memoria-de-sonidos.js.map