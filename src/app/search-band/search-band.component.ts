import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { MenuController, NavController, AlertController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";

@Component({
  selector: "app-search-band",
  templateUrl: "./search-band.component.html",
  styleUrls: ["./search-band.component.scss"]
})
export class SearchBandComponent implements OnInit {
  constructor(
    public menu: MenuController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController
  ) {
    this.signUpForm = this.formBuilder.group({
      talento: new FormControl("", Validators.compose([Validators.required])),
      estilos: new FormControl("", Validators.compose([Validators.required])),
      descricao: new FormControl("", Validators.compose([Validators.required])),
      telefone: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(11)])
      )
    });
  }

  openAnnounceMenu() {
    this.menu.enable(true, "announceMenu");
    this.menu.open("announceMenu");
  }

  redirectAnnounce(link) {
    this.navCtrl.navigateForward(link);
  }

  customAlertOptions: any = {
    header: "selecione um ou mais talentos:"
  };

  customAlertOptionsEstilo: any = {
    header: "selecione um ou mais estilos musicais:"
  };

  bandas = [
    {
      nome: "Falling in Reverse",
      estilos: ["Rock", "Nu Metal", "Rap", "Eletrônica"],
      talentoDesejado: "Guitarrista",
    },
    {
      nome: "Teste",
      estilos: ["Rock", "Nu Metal", "Rap", "Eletrônica"],
      talentoDesejado: "Baixista",
    },
    {
      nome: "Oie",
      estilos: ["Rock", "Nu Metal", "Rap", "Eletrônica"],
      talentoDesejado: "Baterista",
    }
  ];

  talentos = [
    { nome: "Acordeon" },
    { nome: "Backing Vocal" },
    { nome: "Baixo" },
    { nome: "Bateria" },
    { nome: "Clarinete" },
    { nome: "DJ" },
    { nome: "Flauta" },
    { nome: "Guitarra" },
    { nome: "Saxofone" },
    { nome: "Teclado" },
    { nome: "Vocalista" },
    { nome: "Violão" },
    { nome: "Violoncelo" },
    { nome: "Violino" }
  ];

  estilosMusicais = [
    { nome: "Alternativo" },
    { nome: "Axé" },
    { nome: "Blues" },
    { nome: "Bolero" },
    { nome: "Bossa Nova" },
    { nome: "Clássico" },
    { nome: "Country" },
    { nome: "Disco" },
    { nome: "Eletrônica" },
    { nome: "Emocore" },
    { nome: "Folk" },
    { nome: "Forró" },
    { nome: "Funk" },
    { nome: "Gospel" },
    { nome: "Hard Rock" },
    { nome: "Hardcore" },
    { nome: "Heavy Metal" },
    { nome: "Hip Hop" },
    { nome: "Rap" },
    { nome: "House" },
    { nome: "Indie" },
    { nome: "Infantil" },
    { nome: "Instrumental" },
    { nome: "J-Rock" },
    { nome: "Jazz" },
    { nome: "K-Rock" },
    { nome: "MPB" },
    { nome: "Nu Metal" },
    { nome: "New Wave" },
    { nome: "Gospel" },
    { nome: "Pagode" },
    { nome: "Pop" },
    { nome: "Punk Rock" },
    { nome: "Reggae" },
    { nome: "Rock" },
    { nome: "Rock Progressivo" },
    { nome: "Rockabilly" },
    { nome: "Salsa" },
    { nome: "Samba" },
    { nome: "Sertanejo" },
    { nome: "Soft Rock" },
    { nome: "Soul" },
    { nome: "Velha Guarda" }
  ];

  public signUpForm: FormGroup;
  public submitAttempt: boolean = false;

  async showModal(banda){
    const alert = await this.alertController.create({
      header: banda.nome,
      message: banda.talentoDesejado,
      mode: "ios",
      buttons: ["ok"]
    });
    await alert.present();
  }

  async presentAlert() {
    var concatErro = '<hr><span style="font-size: 1.2em; text-align: center">';

    if (!this.signUpForm.get("telefone").valid) {
      concatErro +=
        '<br>telefone<span style="color: red; font-weight:700">*</span>';
    }

    if (!this.signUpForm.get("talento").valid) {
      concatErro +=
        '<br>talento<span style="color: red; font-weight:700">*</span>';
    }

    if (!this.signUpForm.get("estilos").valid) {
      concatErro +=
        '<br>estilo musical<span style="color: red; font-weight:700">*</span>';
    }

    if (!this.signUpForm.get("descricao").valid) {
      concatErro +=
        '<br>descrição<span style="color: red; font-weight:700">*</span>';
    }

    concatErro += "</span>";

    const alert = await this.alertController.create({
      header: "ops, algo deu errado!",
      subHeader:
        "parece que você não inseriu todos os dados corretamente, campos com erro:",
      message: concatErro,
      mode: "ios",
      buttons: ["ok"]
    });

    await alert.present();
  }

  async welcomeAlert() {
    const alert = await this.alertController.create({
      header: "vagas abertas na sua banda?",
      message:
        "aqui na tela de anuncio de banda, você deve preencher o talento que sua banda precisa e os estilos musicais que vocês tocam!",
      mode: "ios",
      buttons: ["beleza!"]
    });
    await alert.present();
  }

  async presentAlerta(message) {
    const alert = await this.alertController.create({
      header: "ops, algo deu errado!",
      message: message,
      mode: "ios",
      buttons: ["ok"]
    });
    await alert.present();
  }

  async AlertaCriado() {
    const alert = await this.alertController.create({
      header: "sucesso!",
      message: "você realizou o anúncio!",
      mode: "ios",
      buttons: [
        {
          text: "ok",
          handler: () => {
            this.gotoDashboard();
          }
        }
      ]
    });
    await alert.present();
  }

  gotoDashboard() {
    this.navCtrl.navigateBack("/dashboard");
  }

  submitForm() {
    this.submitAttempt = true;

    if (!this.signUpForm.valid) {
      this.presentAlert();
      return;
    } else {
      firebase
        .firestore()
        .collection("anuncioBanda")
        .add({
          telefone: this.signUpForm.get("telefone").value,
          talento: this.signUpForm.get("talento").value,
          estilos: this.signUpForm.get("estilos").value,
          descricao: this.signUpForm.get("descricao").value,
          userId: firebase.auth().currentUser.uid
        })
        .then(doc => {
          this.AlertaCriado();
          console.log(doc);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  ngOnInit() {
    this.welcomeAlert();
  }
}
