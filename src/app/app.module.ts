import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnnounceComponent } from './announce/announce.component';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBE8q51MQtdnurOCEiAH4wYWMRIS9rRtV0",
  authDomain: "fyb-find-your-band.firebaseapp.com",
  databaseURL: "https://fyb-find-your-band.firebaseio.com",
  projectId: "fyb-find-your-band",
  storageBucket: "",
  messagingSenderId: "162373639321",
  appId: "1:162373639321:web:f10162872be87ba0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, DashboardComponent, AnnounceComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
