import { Component, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';
import { Camera, PictureSourceType } from '@ionic-native/camera';
import * as Tesseract from 'tesseract.js'
import { NgProgress } from '@ngx-progressbar/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AvaliacaoValorPage } from '../avaliacao-valor/avaliacao-valor';
import firebase from 'firebase';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  srcImage: string;
  OCRAD: any;

  @ViewChild('lineCanvas') lineCanvas;
  private lineChart: any;
  Temperatura;
  xArray: any[] = [];
  yArray: any[] = [];

  Umidade;
  xArray1: any[] = [];
  yArray1: any[] = [];

  DateTime;
  xArray2: any[] = [];
  yArray2: any[] = [];

  label: any[] = [];

  data1: any[] = [];

  data2: any[] = [];

  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController, public navCtrl: NavController, private camera: Camera, private actionSheetCtrl: ActionSheetController, public progress: NgProgress) {

    this.Temperatura = firebase.database().ref('Casa-Domingos/Temperatura').orderByKey();
    this.Umidade     = firebase.database().ref('Casa-Domingos/Umidade').orderByKey();
    this.DateTime    = firebase.database().ref('Casa-Domingos/Datetime').orderByKey();

    this.Temperatura.on('value', (snapshot) =>{
      this.xArray.splice(0,this.xArray.length);
      this.yArray.splice(0,this.yArray.length);
      snapshot.forEach((childSnapshot) =>{
        this.xArray.push(childSnapshot.key);
        this.yArray.push(childSnapshot.val());
      });
    });
    
    this.Umidade.on('value', (snapshot) =>{
      this.xArray1.splice(0,this.xArray1.length);
      this.yArray1.splice(0,this.yArray1.length);
      snapshot.forEach((childSnapshot) =>{
        this.xArray1.push(childSnapshot.key);
        this.yArray1.push(childSnapshot.val());
      });
    });

    this.DateTime.on('value', (snapshot) => {
      this.xArray2.splice(0, this.xArray2.length);
      this.yArray2.splice(0, this.yArray2.length);
      snapshot.forEach((childSnapshot) => {
        this.xArray2.push(childSnapshot.key);
        this.yArray2.push(childSnapshot.val());
      });
      this.tempperaturachart();
    });
  }

  tempperaturachart(){

    var data1_val = this.yArray.slice(-6);
    this.data1 = data1_val.slice(1,6)
    console.log("dados Temp: " + this.data1);

    var data2_val = this.yArray1.slice(-6);
    this.data2 = data2_val.slice(1,6);
    console.log("dados Umi: " + this.data2);

    var data3_val = this.yArray2.slice(-6);
    this.label = data3_val.slice(1, 6);
    console.log("dados Umi: " + this.label);

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.label,
            datasets: [
                {
                      label: "Temperatura",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: this.data1,
                      spanGaps: false,
                }, {
                      label: "Umidade",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(204, 0, 0, 0.4)",
                      borderColor: "rgba(204, 0, 0, 1)",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "rgba(204, 0, 0, 1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(204, 0, 0, 1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: this.data2,
                      spanGaps: false,
              }
            ]
        },
        options:{
          scales:{
            xAxes:[{
              ticks: {
                autoSkip: true
              },
              display: true,
              labelString: 'Ages'
            }]
          }
        }
    });
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose Photo',
          handler: () => {
            this.getPicture(0); // 0 == Library
          }
        },{
          text: 'Take Photo',
          handler: () => {
            this.getPicture(1); // 1 == Camera
          }
        },{
          text: 'Demo Photo',
          handler: () => {
            this.srcImage = 'assets/img/demo.png';
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: number) {
    // You can check the values here:
    // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
    this.camera.getPicture({
      quality: 100,
      destinationType: 0, // DATA_URL
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  analyze() {
    let loader = this.loadingCtrl.create({
     content: 'Convertendo imagem...'
    });
    loader.present();
    Tesseract.recognize(this.srcImage)
    .progress(message => {
      if (message.status === 'recognizing text')
      this.progress.set(message.progress);
    })
    .catch(err => console.error(err))
    .then(result => {
      alert(result.text);
    })
    .finally(resultOrError => {
      this.progress.complete();
      loader.dismissAll();
    });
  }

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }

  goToAvaliar() {
    this.navCtrl.push(AvaliacaoValorPage);
  }

}
