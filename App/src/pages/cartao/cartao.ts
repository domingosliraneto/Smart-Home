import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardIO } from '@ionic-native/card-io';

import { ConfPagaPage } from '../conf-paga/conf-paga';

@IonicPage()
@Component({
  selector: 'page-cartao',
  templateUrl: 'cartao.html',
})
export class CartaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public cardIO: CardIO) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartaoPage');
  }

  cardImage = 'assets/img/misc/credit-card.png';

  card = {
    cardType: '',
    cardNumber: '',
    redactedCardNumber: '',
    expiryMonth: null,
    expiryYear: null,
    cvv: '',
    postalCode: ''
  };

  scanCard() {
    this.cardIO.canScan()
      .then(
      (res: boolean) => {
        if (res) {
          const options = {
            scanExpiry: true,
            hideCardIOLogo: true,
            scanInstructions: 'Please position your card inside the frame',
            keepApplicationTheme: true,
            requireCCV: true,
            requireExpiry: true,
            requirePostalCode: false
          };
          this.cardIO.scan(options).then(response => {
            console.log('Scan complete');

            const { cardType, cardNumber, redactedCardNumber,
                    expiryMonth, expiryYear, cvv, postalCode } = response;

            this.card = {
              cardType,
              cardNumber,
              redactedCardNumber,
              expiryMonth,
              expiryYear,
              cvv,
              postalCode
            };
          });
        }
      });
  }

  fabGone = false;
  ionViewWillEnter() {
    this.fabGone = false;
  }

  ionViewWillLeave() {
    this.fabGone = true;
  }

  goToPasswor() {
    this.navCtrl.push(ConfPagaPage);
  }

}
