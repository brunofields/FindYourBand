import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
})
export class ShowsComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}
  redirect(link){
    this.navCtrl.navigateForward('/'+ link);
  }
  logout() {
    firebase.auth().signOut();
    this.navCtrl.navigateBack('/');
  }
}
