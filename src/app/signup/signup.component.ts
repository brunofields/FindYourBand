import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})


export class SignupComponent implements OnInit {
  
  customPopoverOptions: any = {
    header: 'selecione seu sexo:',
  };
  
  customAlertOptions: any = {
    header: 'selecione um ou mais instrumentos:',
    translucent: true,
  };
  
  customAlertOptionsEstilo: any = {
    header: 'selecione um ou mais estilos musicais:',
    translucent: true,
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
  
  private signUpForm : FormGroup;
  public submitAttempt: boolean = false;
  
  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public alertController: AlertController) { 
    this.signUpForm = this.formBuilder.group({
      nome: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      genero: new FormControl('', Validators.compose([Validators.required])),
      data: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
      telefone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(11)])),
      talento: new FormControl('', Validators.compose([Validators.required])),
      estilos: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      senha: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmaSenha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    },{
    });
    
    
    
  }
  
  
  
  async presentAlert() {
    var concatErro = '<hr><span style="font-size: 1.2em; text-align: center">';
    
    if(!this.signUpForm.get('nome').valid){
      concatErro += 'nome<span style="color: red; font-weight:700">*</span>' 
    }
    
    if(!this.signUpForm.get('genero').valid){
      concatErro += '<br>gênero<span style="color: red; font-weight:700">*</span>' 
    }
    
    if(!this.signUpForm.get('data').valid){
      concatErro += '<br>data de nascimento<span style="color: red; font-weight:700">*</span>' 
    }
    
    if(!this.signUpForm.get('telefone').valid){
      concatErro += '<br>telefone<span style="color: red; font-weight:700">*</span>' 
    }
    
    if(!this.signUpForm.get('talento').valid){
      concatErro += '<br>talento<span style="color: red; font-weight:700">*</span>' 
    }
    
    if(!this.signUpForm.get('estilos').valid){
      concatErro += '<br>estilo musical<span style="color: red; font-weight:700">*</span>' 
    }
    
    if(!this.signUpForm.get('email').valid){
      concatErro += '<br>email<span style="color: red; font-weight:700">*</span>' 
    }
    
    if(!this.signUpForm.get('senha').valid){
      concatErro += '<br>senha precisa ter 6 caracteres<span style="color: red; font-weight:700">*</span>' 
    }
    
    concatErro += "</span>"
    
    const alert = await this.alertController.create({
      header: 'ops, algo deu errado!',
      subHeader: 'parece que você não inseriu todos os dados corretamente, campos com erro:',
      message: concatErro,
      mode: 'ios',
      buttons: ['Ok']
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
      buttons: ['Ok']
    });
    await alert.present();
  }
  
  gotoLogin(){
    this.navCtrl.navigateBack('/login');
  }
  
  submitForm(){

    this.submitAttempt = true;

    
      if(this.signUpForm.get('senha').value != this.signUpForm.get('confirmaSenha').value){
        this.presentAlerta('senhaigual');
        return;
      }
    
    if(!this.signUpForm.valid){
      this.presentAlert();
      return;
    }   else {
      
      firebase.auth().createUserWithEmailAndPassword(this.signUpForm.get('email').value,this.signUpForm.get('senha').value)
      .then((data) => {
        console.log(data)
        
        
        // newUser.updatePhoneNumber(this.signUpForm.get('telefone').value).then((err) => {
        //   console.log(err)
        // })
        
        
        let newUser: firebase.User = data.user;
        newUser.updateProfile({
          displayName: this.signUpForm.get('nome').value,
          photoURL: "",
        }).then((res) => {
          console.log('Profile Updated')
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
        this.presentAlerta(err.code)
      })  
    } 
  }
  
  
  
  ngOnInit() {
    
  }
  
}
