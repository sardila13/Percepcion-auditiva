import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemoriaDeSonidosPage } from './memoria-de-sonidos';

@NgModule({
  declarations: [
    MemoriaDeSonidosPage,
  ],
  imports: [
    IonicPageModule.forChild(MemoriaDeSonidosPage),
  ],
})
export class MemoriaDeSonidosPageModule {}
