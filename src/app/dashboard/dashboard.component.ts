import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(public menu: MenuController, public navCtrl: NavController) { }

  openDashMenu() {
    this.menu.enable(true, 'dashboardMenu');
    this.menu.open('dashboardMenu');
  }

  redirectAnnounce(){
    this.navCtrl.navigateForward('/announce');
  }

  ngOnInit() {}

}

  
