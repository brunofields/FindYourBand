import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {

  constructor(public menu: MenuController, public navCtrl: NavController) {}

  openAnnounceMenu() {
    this.menu.enable(true, "announceMenu");
    this.menu.open("announceMenu");
  }

  redirectAnnounce(link) {
    this.navCtrl.navigateForward(link);
  }

  logout() {
    firebase.auth().signOut();
  }

  ngOnInit() {}

}
