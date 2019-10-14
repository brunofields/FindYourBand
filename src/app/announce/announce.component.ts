import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.scss'],
})
export class AnnounceComponent implements OnInit {


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