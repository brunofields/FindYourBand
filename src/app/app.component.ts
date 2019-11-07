import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#e26c6c');
      this.splashScreen.hide();
    });
  }

  redirect(link){
    this.navCtrl.navigateForward('/'+ link);
  }
  logout() {
    firebase.auth().signOut();
    this.navCtrl.navigateBack('/');
  }
}
