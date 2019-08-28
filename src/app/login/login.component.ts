import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms'
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: string = "";
  senha: string = "";

  constructor(public navCtrl: NavController, public alertController: AlertController) { 


  }

  ngOnInit() {}

  async presentAlerta(message) {

    if(message.code=='auth/user-not-found'){
      message = "e-mail não cadastrado!"
    }

    const alert = await this.alertController.create({
      header: 'ops, algo deu errado!',
      message: message,
      mode: 'ios',
      buttons: ['Ok']
    });
    await alert.present();
  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.email,this.senha).then((user) => {
      console.log(user)
    }).catch((err) => {
      console.log(err)
      this.presentAlerta(err);
    })
  }


  gotoSignUp(){
    this.navCtrl.navigateForward('/signup');
  }
}
