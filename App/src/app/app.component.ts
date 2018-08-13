import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireDatabase } from 'angularfire2/database';
// import { HomePage } from '../pages/home/home';
import { Observable } from 'rxjs/Observable';
import { Login } from '../pages/login/login';
import { Storage } from '@ionic/storage';
// import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;
  users: any;
  // pages: Array<{title: string, component: any}>;

  public  BJardim:  boolean;
  public  LJardim:  boolean;
  public  LArea:    boolean;
  public  LPiscina: boolean;

  items: Observable<any[]>;

  constructor(public storage: Storage, private db: AngularFireDatabase ,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    storage.ready().then(() => {
      storage.get('BJardim').then((val) => {
        this.BJardim = val;
      })
    });

    storage.ready().then(() => {
      storage.get('LJardim').then((val) => {
        this.LJardim = val;
      })
    });

    storage.ready().then(() => {
      storage.get('LArea').then((val) => {
        this.LArea = val;
      })
    });

    storage.ready().then(() => {
      storage.get('LPiscina').then((val) => {
        this.LPiscina = val;
      })
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  pushFireBJardim(){
    console.log(this.BJardim);
     this.db.list('Casa-Domingos').set('Bomba', this.BJardim);
     this.storage.set('BJardim', this.BJardim);
  }

  pushFireLJardim(){
    console.log(this.LJardim);
    this.db.list('Casa-Domingos').set('Rele1', this.LJardim);
    this.storage.set('LJardim', this.LJardim);
  }

  pushFireLArea(){
    console.log(this.LArea);
    this.db.list('Casa-Domingos').set('Rele2', this.LArea);
    this.storage.set('LArea', this.LArea);
  }

  pushFireLPiscina(){
    console.log(this.LPiscina);
    this.db.list('Casa-Domingos').set('Rele3', this.LPiscina);
    this.storage.set('LPiscina', this.LPiscina);
  }

}
