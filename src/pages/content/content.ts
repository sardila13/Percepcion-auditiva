import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  constructor(public navCtrl: NavController) { }

  categorias(){
  	this.navCtrl.push('CategoriasPage');
  }
  identificacionDeLaCategoria(){
  	this.navCtrl.push('IdentificacionDeLaCategoriaPage');
  }
  memoriaDeSonidos(){
  	this.navCtrl.push('MemoriaDeSonidosPage');
  }
  memoriaDeSonidosEnSecuencia(){
  	this.navCtrl.push('MemoriaDeSonidosEnSecuenciaPage');
  }
  identificacionDeContextosOSituaciones(){
  	this.navCtrl.push('IdentificacionDeContextosOSituacionesPage');
  }
  figuraFondo(){
  	this.navCtrl.push('FiguraFondoPage');
  }

}
