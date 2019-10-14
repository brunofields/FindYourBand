import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announce-band',
  templateUrl: './announce-band.component.html',
  styleUrls: ['./announce-band.component.scss'],
})
export class AnnounceBandComponent implements OnInit {

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
