import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';

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
      data: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      talento: new FormControl('', Validators.required),
      estilos: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
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
      concatErro += '<br>senha precisa ter 6 caracteres e pelo menos 1 número<span style="color: red; font-weight:700">*</span>' 
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
  
  gotoLogin(){
    this.navCtrl.navigateBack('/login');
  }
  
  submitForm(){
    this.submitAttempt = true;
    
    if(!this.signUpForm.valid){
      this.presentAlert();
    }    
  }
  
  
  
  ngOnInit() {
    
  }
  
}
