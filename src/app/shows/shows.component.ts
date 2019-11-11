import { NavController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";

@Component({
  selector: "app-shows",
  templateUrl: "./shows.component.html",
  styleUrls: ["./shows.component.scss"]
})
export class ShowsComponent implements OnInit {

  showsList = [
    {
      nomeShow: "Rock in Santos",
      estiloShow: "Rock anos 2000+",
      descricao: "Venha conhecer nosso espaço e curtir o que há de melhor!",
      dataShow: "20/11/2019",
      localShow: "Avenida Ana Costa, 1300",
    },
    {
      nomeShow: "Rock in Santos",
      estiloShow: "Rock anos 2000+",
      descricao: "Venha conhecer nosso espaço e curtir o que há de melhor!",
      dataShow: "20/11/2019",
      localShow: "Avenida Ana Costa, 1300",
    },
    {
      nomeShow: "Rock in Santos",
      estiloShow: "Rock anos 2000+",
      descricao: "Venha conhecer nosso espaço e curtir o que há de melhor!",
      dataShow: "20/11/2019",
      localShow: "Avenida Ana Costa, 1300",
    }
  ];


  constructor(private navCtrl: NavController) {
  }

  
  ngOnInit() {}
  redirect(link) {
    this.navCtrl.navigateForward("/" + link);
  }
  logout() {
    firebase.auth().signOut();
    this.navCtrl.navigateBack("/");
  }
}
