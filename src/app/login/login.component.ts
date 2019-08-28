import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {}

  gotoSignUp(){
    this.navCtrl.navigateForward('/signup');
  }
}
