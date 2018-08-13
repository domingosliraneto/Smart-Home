import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Chart } from 'chart.js';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// import { HomePage } from '../home/home';

@IonicPage()
@Component({
    selector: 'page-avaliacao-final',
    templateUrl: 'avaliacao-final.html',
})
export class AvaliacaoFinalPage {

    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;

    barChart: any;
    doughnutChart: any;
    lineChart: any;
    pdfObj = null;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private platform: Platform,
        private file: File,
        private fileOpener: FileOpener) {
    }

    ionViewDidLoad() {
        this.barChart = new Chart(this.barCanvas.nativeElement, {

            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }

        });

        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

            type: 'doughnut',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            }

        });

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {

            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
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
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            }

        });
    }

    getFormattedDate(){
        let date = new Date();

        const month = date.getMonth()+1;
        const day = date.getDate();

        const formattedDate = ((day < 10) ? `0${day}` : day) + '-' + ((month < 10) ? `0${month}` : month) + '-' + (date.getFullYear());
        return formattedDate;
    }

    generatePDF(){
        let pdfStructure = {
            content: [
                { text: 'Teste de pdf', style: 'header'},
                { text: 'lorem ipsum qsimsgxlb efwemglmw', style: 'body'},
            ],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true
                },
                body: {
                    fontSize: 18,
                }
            }
        }
        this.pdfObj = pdfMake.createPdf(pdfStructure);
    }

    downloadPDF(){
        if(this.platform.is('cordova')){

            console.log('using cordova'+this.getFormattedDate());

            this.pdfObj.getBuffer( buffer => {
                let utf8 = new Uint8Array(buffer);
                let binaryArray = utf8.buffer;
                let blob = new Blob([binaryArray], { type: 'application/pdf' });
                let fileName = `contrato-es-${this.getFormattedDate()}.pdf`
                console.log(`${this.file.dataDirectory}${fileName}`);

                this.file.writeFile(this.file.dataDirectory, fileName, blob, { replace: true }).then( fileEntry => {
                    this.fileOpener.open(`${this.file.dataDirectory}${fileName}`, 'application/pdf');
                }).catch(err => console.log(err));
            })

        }else{
            this.pdfObj.download();
        }
    }

    goToGerarPDF(){

        this.generatePDF();

        if(this.pdfObj){
            this.downloadPDF();
        }

        //this.navCtrl.setRoot(HomePage);
    }

}
