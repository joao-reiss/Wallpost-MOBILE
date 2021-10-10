import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage implements OnInit {

  img:boolean = true;
  user: any = {
    idusuario: '',
    nm_usuario: '',
    cd_senha: '',
    ds_email: '',
    ds_celular:'',
    cd_cpf:'',
    cd_cpnj:'',
    imagem_user: '',
    cd_novasenha:''
  };
  
  fGroup: FormGroup;

  constructor(
    public userService: UserService,
    public fBuilder: FormBuilder,
    public toast: ToastController) {
      const user  = JSON.parse(localStorage.getItem('usuario'))
      this.user.idusuario = user.idusuario;

  this.fGroup = this.fBuilder.group({
      idusuario: [this.user.idusuario, Validators.compose([
      Validators.required,
    ])],
      cd_senha: [this.user.cd_senha, Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(45),
    ])],
    cd_novasenha: [null, Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(45),
    ])]
  })

   }

  ngOnInit(){}

  ionViewDidEnter()
  {
    const user  = JSON.parse(localStorage.getItem('usuario'))
    this.user.nm_usuario = user.nm_usuario;

    if(user.imagem_user != null)
    {
      this.img = true;
      this.user.imagem_user = user.imagem_user;
    }
    else
    {
      this.img = false;
      this.user.imagem_user = null;
    }
    
    this.user.ds_email = user.ds_email;
    this.user.ds_celular = user.ds_celular;
    console.clear()

  }


  ifUserError:any = {

    minError: null,
    maxError: null,
    Required: null,
    newMinError: null,
    newMaxError: null,
    newRequired:null

  };

  minError:any =  null;
  newpassword:any = "";

  public type = 'text';
  public type2 = 'password'; 
  public type3 = 'password';  
  
  showPass = false;
  showPass2 = false; 
  showPass3 = false;  

  showPassword() {
    this.showPass = !this.showPass;
          if(this.showPass){
              this.type = 'password';
               } else {
         this.type = 'text';
       }
     }

     showPassword2() {
      this.showPass2 = !this.showPass2;
            if(this.showPass2){
                this.type2 = 'text';
                 } else {
           this.type2 = 'password';
         }
       }

       showPassword3() {
        this.showPass3 = !this.showPass3;
              if(this.showPass3){
                  this.type3 = 'text';
                   } else {
             this.type3 = 'password';
           }
         }

        UpdateSenha()
        {
          
          if(this.fGroup.value.cd_novasenha == this.newpassword)
          {
            console.log('Nova Senha:', this.fGroup.value.cd_novasenha)
            console.log('Senha "fGroup.cd_senha":', this.fGroup.value.cd_senha)
            if(this.fGroup.controls.cd_senha.errors)
            {
              this.ifFail();
              if(this.fGroup.controls.cd_senha.errors.required)
              {
                alert('erro')
                this.ifUserError.minError = "";
                this.ifUserError.maxError = "";
                this.ifUserError.Required = "Este campo necessita ser preenchido!";
              }
              if(this.fGroup.controls.cd_senha.errors.minLength)
              {
                alert('erro')
                this.ifUserError.Required = "";
                this.ifUserError.maxError = "";
                this.minError = "A senha precisa ter ao menos 5 caractéres!";
                this.ifUserError.minError = "A senha precisa ter ao menos 5 caractéres!";
              }
              if(this.fGroup.controls.cd_senha.errors.maxLength)
              {
                alert('erro')
                this.ifUserError.minError = "";
                this.ifUserError.Required = "";
                this.ifUserError.maxError = "A senha precisa ter no máximo 45 caractéres!";
              }
            }
            if(this.fGroup.controls.cd_novasenha.errors)
            {
              this.ifFail();
              if(this.fGroup.controls.cd_novasenha.errors.required)
              {
                this.ifUserError.newMinError = "";
                this.ifUserError.newMaxError = "";
                this.ifUserError.newRequired = "Este campo necessita ser preenchido!";
              }
              if(this.fGroup.controls.cd_novasenha.errors.minLength)
              {
                this.ifUserError.newMinError = "";
                this.ifUserError.newMaxError = "";
                this.ifUserError.newRequired = "Este campo necessita ser preenchido!";
              }
              if(this.fGroup.controls.cd_novasenha.errors.maxLength)
              {
                this.ifUserError.newMinError = "";
                this.ifUserError.newMaxError = "";
                this.ifUserError.newRequired = "Este campo necessita ser preenchido!";

              }
            }
            else if(!this.fGroup.controls.errors && this.fGroup.value != "")
            { 
              this.userService.UpdatePass(this.user.idusuario, this.fGroup.value).subscribe((res) =>{
                console.log(res)
                this.ifSuccess();
              }, (erro: HttpErrorResponse) => {
                this.ifFail();
              });
            }
           
          }
          else{
            this.ifFail();
          }
        }

       async ifSuccess()
        {
          const toast = await this.toast.create({
            message: "Senha Atualizada!", cssClass: "toastClass",  duration: 1500, position: "bottom"
            });
            toast.present();
        }

        async ifFail()
        {
          const toast = await this.toast.create({
            message: "Senha Incorreta!", cssClass: "toastClass",  duration: 1500, position: "bottom"
            });
            toast.present();
        }
      
  }

