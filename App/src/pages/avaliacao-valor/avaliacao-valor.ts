import { Component } from '@angular/core';
import { IonicPage ,NavController } from 'ionic-angular';

import { CartaoPage } from '../cartao/cartao';

@IonicPage()
@Component({
  selector: 'page-avaliacao-valor',
  templateUrl: 'avaliacao-valor.html',
})
export class AvaliacaoValorPage {

  cameras: any[] = [
    {
      title: 'Camera 1',
      camera: 'https://10.0.0.100:8080/video'
    },{
      title: 'Camera 1',
      camera: 'https://10.0.0.100:8080/video'
    }
  ]
  
  constructor(public navCtrl: NavController) {
  }
  
  goToCamera(){
    this.navCtrl.push(CartaoPage);
  }

  ionViewDidLoad() {
  }

}
