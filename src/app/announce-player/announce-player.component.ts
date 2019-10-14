import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-announce-player',
  templateUrl: './announce-player.component.html',
  styleUrls: ['./announce-player.component.scss'],
})
export class AnnouncePlayerComponent implements OnInit {

  constructor(public menu: MenuController, public navCtrl: NavController, public formBuilder: FormBuilder, public alertController: AlertController) {
    this.signUpForm = this.formBuilder.group({
      talento: new FormControl('', Validators.compose([Validators.required])),
      estilos: new FormControl('', Validators.compose([Validators.required])),
    },{
    });
    
   }

  openAnnounceMenu() {
    this.menu.enable(true, 'announceMenu');
    this.menu.open('announceMenu');
  }
  
  redirectAnnounce(link){
    this.navCtrl.navigateForward(link);
  }

  customAlertOptions: any = {
    header: 'selecione um ou mais talentos:',
  };
  
  customAlertOptionsEstilo: any = {
    header: 'selecione um ou mais estilos musicais:',
  };
  
  talentos = [
    {nome: "Acordeon"},
    {nome: "Backing Vocal"},
    {nome: "Baixo"},
    {nome: "Bateria"},
    {nome: "Clarinete"},
    {nome: "DJ"},
    {nome: "Flauta"},
    {nome: "Guitarra"},
    {nome: "Saxofone"},
    {nome: "Teclado"},
    {nome: "Vocalista"},
    {nome: "Violão"},
    {nome: "Violoncelo"},
    {nome: "Violino"},
  ]
  
  
  estilosMusicais = [
    {nome: "Alternativo"},
    {nome: "Axé"},
    {nome: "Blues"},
    {nome: "Bolero"},
    {nome: "Bossa Nova"},
    {nome: "Clássico"},
    {nome: "Country"},
    {nome: "Disco"},
    {nome: "Eletrônica"},
    {nome: "Emocore"},
    {nome: "Folk"},
    {nome: "Forró"},
    {nome: "Funk"},
    {nome: "Gospel"},
    {nome: "Hard Rock"},
    {nome: "Hardcore"},
    {nome: "Heavy Metal"},
    {nome: "Hip Hop"},
    {nome: "Rap"},
    {nome: "House"},
    {nome: "Indie"},
    {nome: "Infantil"},
    {nome: "Instrumental"},
    {nome: "J-Rock"},
    {nome: "Jazz"},
    {nome: "K-Rock"},
    {nome: "MPB"},
    {nome: "Nu Metal"},
    {nome: "New Wave"},
    {nome: "Gospel"},
    {nome: "Pagode"},
    {nome: "Pop"},
    {nome: "Punk Rock"},
    {nome: "Reggae"},
    {nome: "Rock"},
    {nome: "Rock Progressivo"},
    {nome: "Rockabilly"},
    {nome: "Salsa"},
    {nome: "Samba"},
    {nome: "Sertanejo"},
    {nome: "Soft Rock"},
    {nome: "Soul"},
    {nome: "Velha Guarda"},
  ]
  
  public signUpForm : FormGroup;
  public submitAttempt: boolean = false;
  
  async presentAlert() {
    var concatErro = '<hr><span style="font-size: 1.2em; text-align: center">';


    if(!this.signUpForm.get('telefone').valid){
      concatErro += '<br>telefone<span style="color: red; font-weight:700">*</span>' 
    }
    
    if(!this.signUpForm.get('talento').valid){
      concatErro += '<br>talento<span style="color: red; font-weight:700">*</span>' 
    }
    
    if(!this.signUpForm.get('estilos').valid){
      concatErro += '<br>estilo musical<span style="color: red; font-weight:700">*</span>' 
    }

    
    concatErro += "</span>"
    
    const alert = await this.alertController.create({
      header: 'ops, algo deu errado!',
      subHeader: 'parece que você não inseriu todos os dados corretamente, campos com erro:',
      message: concatErro,
      mode: 'ios',
      buttons: ['ok']
    });
    
    await alert.present();
  }

  
  async welcomeAlert() {
    
    const alert = await this.alertController.create({
      header: 'bem vindo!',
      message: "olá, seja bem vindo ao fyb! <br> por favor, insira seus dados corretamente :)",
      mode: 'ios',
      buttons: ['ok']
    });
    await alert.present();
  }
  
  async presentAlerta(message) {
    
    if(message=="auth/email-already-in-use"){
      message = "e-mail já cadastrado!"
    }
    
    if(message=="auth/weak-password"){
      message = "a senha deve conter pelo menos 6 caracteres!"
    }
    
    if(message=="senhaigual"){
      message = "as senhas devem ser iguais!"
    }
    
    const alert = await this.alertController.create({
      header: 'ops, algo deu errado!',
      message: message,
      mode: 'ios',
      buttons: ['ok']
    });
    await alert.present();
  }

  async AlertaCriado() {
    
    const alert = await this.alertController.create({
      header: 'sucesso!',
      message: 'você já pode logar agora',
      mode: 'ios',
      buttons: [{
        text: "ok",
      handler: () => {
        this.gotoLogin();
      }}],
      
    });
    await alert.present();
  }
  
  gotoLogin(){
    this.navCtrl.navigateBack('/');
  }

  
  submitForm(){

    this.submitAttempt = true;
    
    if(!this.signUpForm.valid){
      this.presentAlert();
      return;
    }   else {
      
      firebase.auth().createUserWithEmailAndPassword(this.signUpForm.get('email').value,this.signUpForm.get('senha').value)
      .then( (data) => {
        console.log(data);
        
        let newUser: firebase.User = data.user;
        newUser.updateProfile({
          displayName: this.signUpForm.get('nome').value,
          photoURL: "",
        }).then((res) => {
          // firebase.firestore().collection('usuarios').add({
          //   nome: this.signUpForm.get('nome').value,
          //   telefone: this.signUpForm.get('telefone').value,
          //   talento: this.signUpForm.get('talento').value,
          //   estilos: this.signUpForm.get('estilos').value,
          //   genero: this.signUpForm.get('genero').value,
          // })
          this.AlertaCriado();
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
        this.presentAlerta(err.code)
      })  
    } 
  }
  
  

  ngOnInit() {}

}
