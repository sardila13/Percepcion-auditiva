import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IdentificacionDeContextosOSituacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-identificacion-de-contextos-o-situaciones',
  templateUrl: 'identificacion-de-contextos-o-situaciones.html',
})
export class IdentificacionDeContextosOSituacionesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdentificacionDeContextosOSituacionesPage');
  }

}
