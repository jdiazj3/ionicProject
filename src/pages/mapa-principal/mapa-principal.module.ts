import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaPrincipalPage } from './mapa-principal';

@NgModule({
  declarations: [
    MapaPrincipalPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaPrincipalPage),
  ],
})
export class MapaPrincipalPageModule {}
