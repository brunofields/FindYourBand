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
      dataShow: "11/11/2019",
      localShow: "Ana Costa, 1300",
    },
    {
      nomeShow: "Saulebas",
      estiloShow: "Samba",
      descricao: "Boteco raiz com música ao vivo!",
      dataShow: "13/11/2019",
      localShow: "Pinheiro Machado, 983",
    },
    {
      nomeShow: "Banda Okami",
      estiloShow: "J-Rock",
      descricao: "O show aqui quem faz são vocês!",
      dataShow: "24/11/2019",
      localShow: "Conselheiro Nébias, 318",
    },
    {
      nomeShow: "Los Deucudios",
      estiloShow: "Classica",
      descricao: "O melhor da música classica",
      dataShow: "18/12/2019",
      localShow: "Robin Road, 51",
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
