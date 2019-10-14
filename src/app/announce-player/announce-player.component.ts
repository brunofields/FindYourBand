import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announce-player',
  templateUrl: './announce-player.component.html',
  styleUrls: ['./announce-player.component.scss'],
})
export class AnnouncePlayerComponent implements OnInit {

  constructor(public menu: MenuController, public navCtrl: NavController) { }

  openAnnounceMenu() {
    this.menu.enable(true, 'announceMenu');
    this.menu.open('announceMenu');
  }
  
  redirectAnnounce(link){
    this.navCtrl.navigateForward(link);
  }

  ngOnInit() {}

}
