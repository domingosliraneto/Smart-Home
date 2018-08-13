import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { SlidesPage } from '../pages/slides/slides';
import { AvaliacaoFinalPage } from '../pages/avaliacao-final/avaliacao-final';
import { DadosContasPage } from '../pages/dados-contas/dados-contas';
import { ConfPagaPage } from '../pages/conf-paga/conf-paga';
import { CartaoPage } from '../pages/cartao/cartao';
import { AvaliacaoValorPage } from '../pages/avaliacao-valor/avaliacao-valor';

import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CardIO } from '@ionic-native/card-io';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio'
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { MathematicalProvider } from '../providers/mathematical/mathematical';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera } from '@ionic-native/camera';
import { NgProgressModule } from '@ngx-progressbar/core';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FIREBASE_CONFIG } from './firebase.credentials';
import {IonicStorageModule} from '@ionic/storage';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StreamingMedia } from '@ionic-native/streaming-media';
import { CameraPipe } from '../pipes/camera/camera'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    Login,
    SlidesPage,
    DadosContasPage,
    ConfPagaPage,
    CartaoPage,
    AvaliacaoValorPage,
    AvaliacaoFinalPage,
    CameraPipe
  ],
  imports: [
    BrowserModule,
  //  BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    NgProgressModule.forRoot(),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    Login,
    SlidesPage,
    AvaliacaoFinalPage,
    ConfPagaPage,
    CartaoPage,
    AvaliacaoValorPage,
    DadosContasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CardIO,
    FingerprintAIO,
    File,
    FileOpener,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MathematicalProvider,
    Camera,
    StreamingMedia
  ]
})
export class AppModule {}
