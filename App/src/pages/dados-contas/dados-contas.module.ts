import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DadosContasPage } from './dados-contas';

@NgModule({
  declarations: [
    DadosContasPage,
  ],
  imports: [
    IonicPageModule.forChild(DadosContasPage),
  ],
})
export class DadosContasPageModule {}
