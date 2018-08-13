import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

import { AvaliacaoFinalPage } from '../avaliacao-final/avaliacao-final';

@IonicPage()
@Component({
  selector: 'page-conf-paga',
  templateUrl: 'conf-paga.html',
})
export class ConfPagaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private faio: FingerprintAIO) {
  }

  ionViewDidLoad() {
  }

  goToVerifi() {
    this.faio.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', // Only Android
      localizedFallbackTitle: 'Use Pin', // Only iOS
      localizedReason: 'Please authenticate' // Only iOS
    })
    .then((result: any) => {
      this.navCtrl.push(AvaliacaoFinalPage);
    })
    .catch((error: any) => {
      console.log('err: ', error);
      this.navCtrl.push(AvaliacaoFinalPage);
    });
  }

}
