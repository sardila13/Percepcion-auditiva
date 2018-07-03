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
import { IonicPage, NavController } from 'ionic-angular';
var ContentPage = /** @class */ (function () {
    function ContentPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContentPage.prototype.categorias = function () {
        this.navCtrl.push('CategoriasPage');
    };
    ContentPage.prototype.identificacionDeLaCategoria = function () {
        this.navCtrl.push('IdentificacionDeLaCategoriaPage');
    };
    ContentPage.prototype.memoriaDeSonidos = function () {
        this.navCtrl.push('MemoriaDeSonidosPage');
    };
    ContentPage.prototype.memoriaDeSonidosEnSecuencia = function () {
        this.navCtrl.push('MemoriaDeSonidosEnSecuenciaPage');
    };
    ContentPage.prototype.identificacionDeContextosOSituaciones = function () {
        this.navCtrl.push('IdentificacionDeContextosOSituacionesPage');
    };
    ContentPage.prototype.figuraFondo = function () {
        this.navCtrl.push('FiguraFondoPage');
    };
    ContentPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-content',
            templateUrl: 'content.html'
        }),
        __metadata("design:paramtypes", [NavController])
    ], ContentPage);
    return ContentPage;
}());
export { ContentPage };
//# sourceMappingURL=content.js.map