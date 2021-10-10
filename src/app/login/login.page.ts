import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../Interfaces/userInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private route: Router,
                public toastcontroller: ToastController,
                private auth: UserService,
                private fBuilder: FormBuilder)
{ 
      this.fGroup = this.fBuilder.group({
        ds_email: [this.user.ds_email, Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
        ])],
        cd_senha: [this.user.cd_senha, Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(45),
        ])]
  });

}
  public fGroup: FormGroup; 

  ngOnInit(){}


  ionViewDidEnter() 
  {
    
    const login  = JSON.parse(localStorage.getItem('login'))
    if(login == '1')
    {
      window.location.reload();
      localStorage.setItem('login', null)
    }
    localStorage.setItem('usuario',  null)
  }
  show: boolean = null;

  public user: any = {

    idusuario: null,
    nm_usuario: null,
    cd_senha: null,
    ds_email: null,
    ds_celular: null,
    cd_cpf:null,
    cd_cpnj:null,
    imagem_user: null

  };
  
  async notSuccess()
  {
    const toast = await this.toastcontroller.create({
        message: "Email ou Senha estão Inválidos!", cssClass: "toastClass",  duration: 1500, position: "bottom"
        });
          toast.present();
  }

  async  login()
  {
    this.show = true;
    this.auth.Login(this.fGroup.value).subscribe((data: User)=> {
  
    localStorage.setItem('usuario',  JSON.stringify(data))
    localStorage.setItem('login', '1')
    const user  = JSON.parse(localStorage.getItem('usuario'))
      console.log(user);
    
        setTimeout(() =>{
          this.show = false;
          this.route.navigateByUrl('/tabs/tab1');
        }, 1500)

    },  (error: HttpErrorResponse) => {
      console.error(error);
      this.show = false;
      this.notSuccess();
    });
    
  }

  recuperar()
  {
    this.route.navigate(['/recuperar']);
  }

}
