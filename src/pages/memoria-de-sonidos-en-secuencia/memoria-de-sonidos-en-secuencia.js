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
 * Generated class for the MemoriaDeSonidosEnSecuenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MemoriaDeSonidosEnSecuenciaPage = /** @class */ (function () {
    function MemoriaDeSonidosEnSecuenciaPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.currentSounds = [];
        this.images = [];
        this.sounds = [];
        this.hide = [];
        this.encontrados = 0;
        this.dificultad = "facil";
        this.rango = 1;
        this.soundsPositions = [0, 1];
        this.categories = ["animalesDeLaGranja", "animalesDeLaSelva",
            "mediosDeTransporte", "instrumentosMusicales", "cosasDeLaCasa", "sonidosDelCuerpo"];
        this.category = this.categories[0];
        for (var j = 0; j < 4; j++) {
            this.hide[j] = true;
        }
        var rango = 1;
        this.setImagesAndPositions(rango);
    }
    MemoriaDeSonidosEnSecuenciaPage.prototype.ionViewWillLeave = function () {
        this.pauseSounds();
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.ionViewDidLoad = function () {
        this.buttons = [];
        for (var a = 0; a < 6; a++) {
            var btnActual = "btn" + a;
            var elbtn = document.getElementById(btnActual);
            elbtn.classList.add("imagenesFa");
            this.buttons.push(elbtn);
        }
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.setClassImages = function (clase) {
        for (var b = 0; b < this.buttons.length; b++) {
            this.buttons[b].classList.add(clase);
        }
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.randomNumber = function (max) {
        return Math.floor(Math.random() * (max + 1));
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.hideImagenes = function () {
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
    MemoriaDeSonidosEnSecuenciaPage.prototype.pauseSounds = function () {
        for (var xy = 0; xy < this.currentSounds.length; xy++) {
            this.currentSounds[xy].pause();
            this.currentSounds[xy].currentTime = 0;
        }
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.selectImage = function (id) {
        var sound = this.images[id].split(".jpg")[0] + ".mp3";
        if (this.sounds[this.encontrados] === sound) {
            if (this.encontrados == this.sounds.length - 1) {
                console.log("Ganaste");
                window.alert("Ganaste");
                this.changeDifficulty();
            }
            else {
                console.log("Encontraste uno");
                this.encontrados++;
            }
        }
        else {
            this.encontrados = 0;
            window.alert("Intentalo de nuevo");
            console.log("Intenta de nuevo");
        }
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.changeDifficulty = function () {
        this.pauseSounds();
        this.hideImagenes();
        this.sounds = [];
        var clase = "";
        var rango = 1;
        if (this.dificultad === "facil") {
            this.soundsPositions = [0, 1];
            rango = 1;
            clase = "imagenesFa";
        }
        else if (this.dificultad === "intermedio") {
            this.soundsPositions = [0, 1, 2, 3];
            rango = 3;
            clase = "imagenesIntermedio";
        }
        else if (this.dificultad === "dificil") {
            this.soundsPositions = [0, 1, 2, 3, 4, 5];
            rango = 5;
            clase = "imagenesDif";
        }
        this.encontrados = 0;
        this.rango = rango;
        this.setClassImages(clase);
        this.setImagesAndPositions(rango);
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.changeCategory = function (id) {
        this.changeDifficulty();
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.playSound = function () {
        this.pauseSounds();
        this.index = -1;
        this.playArraySounds();
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.playArraySounds = function () {
        var _this = this;
        this.index++;
        ;
        if (this.index === this.sounds.length)
            return;
        var audio = new Audio("assets/sounds/" + this.sounds[this.index]);
        this.currentSounds[this.index] = audio;
        audio.play();
        audio.addEventListener('ended', function () { return _this.playArraySounds(); });
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.setImagesAndPositions = function (rango) {
        var winnerPositions = this.setWinnersPositions(rango, this.randomNumber);
        var sounds = this.setImages(winnerPositions, this.randomNumber, rango, this.images, this.category, this.sounds, this.soundsPositions);
        this.encontrados = 0;
        this.playSoundParam(sounds);
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.playSoundParam = function (sounds) {
        this.index = -1;
        this.playArraySoundsParam(sounds);
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.playArraySoundsParam = function (arraySounds) {
        this.index++;
        ;
        if (this.index === this.sounds.length)
            return;
        var audio = new Audio("assets/sounds/" + arraySounds[this.index]);
        this.currentSounds[this.index] = audio;
        this.playArraySoundsParam(arraySounds);
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.setWinnersPositions = function (rango, functionRandomNumber) {
        var winnerPositions = [];
        for (var i = 0; i <= rango; i++) {
            var winnerPosition = functionRandomNumber(rango);
            if (winnerPositions.indexOf(winnerPosition) > -1)
                i--;
            else
                winnerPositions.push(winnerPosition);
        }
        this.winner = winnerPositions;
        return winnerPositions;
    };
    MemoriaDeSonidosEnSecuenciaPage.prototype.setImages = function (winnerPositions, functionRandomNumber, rango, images, category, winnerSounds, soundsPositions) {
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
            var actualPosition = soundsPositions[soundPosition];
            winnerSounds[actualPosition] = images[winnerPositions[dx]].split(".jpg")[0] + ".mp3";
            soundsPositions.splice(soundsPositions.indexOf(actualPosition), 1);
        }
        return winnerSounds;
    };
    MemoriaDeSonidosEnSecuenciaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-memoria-de-sonidos-en-secuencia',
            templateUrl: 'memoria-de-sonidos-en-secuencia.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], MemoriaDeSonidosEnSecuenciaPage);
    return MemoriaDeSonidosEnSecuenciaPage;
}());
export { MemoriaDeSonidosEnSecuenciaPage };
//# sourceMappingURL=memoria-de-sonidos-en-secuencia.js.map