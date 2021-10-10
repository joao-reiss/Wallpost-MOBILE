import { UserService } from './../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  preserveWhitespaces: false
})
export class RegistroPage implements OnInit {

  show: boolean = null;
  bChange: boolean = null;
  returned: any = null;

  constructor(private route: Router,
    public toastcontroller: ToastController,
            private fBuilder: FormBuilder,
              private register: UserService) {


  this.fGroup = this.fBuilder.group({
  nm_usuario: [this.user.nm_usuario, Validators.compose([
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(25)
  ])],
  cd_senha: [this.user.cd_senha, Validators.compose([
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(45),
  ])],
  ds_email: [this.user.ds_email, Validators.compose([
    Validators.required,
    Validators.email,
    Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
  ])],
  ds_celular: [this.user.ds_celular, Validators.compose([
    Validators.required,
    Validators.minLength(15),
  ])],
});
  
}

  ngOnInit() {}

  private isToastVisible: boolean = true;
  
  RErrorUser:any = "";
  maxLErrorUser: any = "";
  minLErrorUser: any = "";

  RErrorPass:any = "";
  maxLErrorPass: any = "";
  minLErrorPass: any = "";

  RErrorEmail:any = "";
  ErrorEmail: any = "";

  RErrorPhone: any = "";
  minPhone: any = "";

  cont: number = 0;

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


  public fGroup: FormGroup;



         async Success()
        {
          this.show = true;

          setTimeout(() =>{
            this.show = false;
            this.route.navigate(['/login']);
          }, 3000)
          
        
          const toast = await this.toastcontroller.create({
            message: "Cadastro Realizado com Sucesso!", cssClass: "toastRegistro",  duration: 1500, position: "top"
            });
            toast.present();

        }

       async Faild()
        {

          const toast = await this.toastcontroller.create({
            message: "Nome de Email já cadastrados!" , cssClass: "toastRegistro",  duration: 1500, position: "top"
            });

            toast.present();  

        }

  
          registro(formGroup: FormGroup)
        {
        
      
            this.RErrorUser = "";
            this.maxLErrorUser = "";
            this.minLErrorUser = "";
            this.RErrorPass = "";
            this.maxLErrorPass = "";
            this.minLErrorPass = "";
            this.RErrorEmail = "";
            this.ErrorEmail = "";
            this.minLErrorUser = "";
            this.RErrorPhone = "";
            this.minPhone = "";       


          if(this.fGroup.value.nm_usuario!==0)
          {
           
                if(this.fGroup.controls.nm_usuario.errors)
              {
                
                if(this.fGroup.controls.nm_usuario.errors.required)
                {
                  this.RErrorUser = "Este campo é obrigatório!";
                }

                if(this.fGroup.controls.nm_usuario.errors.minlength)
                {
                    this.RErrorUser = "";
                    this.minLErrorUser = "O nome de usuário deve conter no mínimo 5 caracteres!";
                
                  
                }

                if(this.fGroup.controls.nm_usuario.errors.maxLength)
                {
                  this.maxLErrorUser = "O nome de  usuário deve conter no máximo 25 caracteres!";
                }

          }

          }
          else
          {
            this.RErrorUser = "Este campo é obrigatório!";
          }
          
          if(this.fGroup.value.cd_senha!=0)
          {
            
            // this.fGroup.value.cd_senha = this.fGroup.value.cd_senha.trim();
            // this.fGroup.value.cd_senha = this.fGroup.value.cd_senha.replace(/\s/g, '')
                if(this.fGroup.controls.cd_senha.errors)
                {
                  this.RErrorPass = "Este campo é obrigatório!";
                    if(this.fGroup.controls.cd_senha.errors.required || this.fGroup.value.cd_senha===0)
                    {
                      this.RErrorPass = "Este campo é obrigatório!";
                    }

                    else if(this.fGroup.controls.cd_senha.errors.minLength)
                    {
                      this.RErrorPass = "";
                      this.minLErrorPass = "A senha deve conter no minimo 5 caracteres!";
                    }

                    else if(this.fGroup.controls.cd_senha.errors.maxLength)
                    {
                      this.maxLErrorPass = "A senha deve conter no máximo 45 caracteres!";
                    }

            }
          }

          else
          {
            this.RErrorPass = "Este campo é obrigatório!";
          }




            if(this.fGroup.controls.ds_email.errors)
            {
                if(this.fGroup.controls.ds_email.errors.required)
                {
                  this.RErrorEmail = "Este campo é obrigatório!";
                }

                else if(this.fGroup.controls.ds_email.errors.email || this.fGroup.controls.ds_email.errors.pattern)
                {
                  this.RErrorEmail = "";
                  this.ErrorEmail = "Email inválido!";
                }


            }


            if(this.fGroup.controls.ds_celular.errors)
            {
                if(this.fGroup.controls.ds_celular.errors.required  || this.fGroup.controls.ds_celular.errors.pattern)
                {
                  this.RErrorPhone = "Este campo é obrigatório!";
                }

                else if(this.fGroup.controls.ds_celular.errors.minLength)
                {
                  this.RErrorPhone = "";
                  this.minPhone = "O número deve conter ao menos 15 digitos!";
                }


            }
            
            

          else if(!this.fGroup.controls.nm_usuario.errors && !this.fGroup.controls.cd_senha.errors &&
            !this.fGroup.controls.ds_email.errors && !this.fGroup.controls.ds_celular.errors && this.fGroup.value.nm_usuario != 0 && this.fGroup.value.cd_senha !=0)
          {

            Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
           
              this.register.Register(this.fGroup.value).subscribe((data) =>{
              console.table(this.fGroup.value);
              this.Success();
               },  (error: HttpErrorResponse) => {
                console.log(error);
                this.Faild();
              });
              
            
            this.RErrorUser = "";
            this.maxLErrorUser = "";
            this.minLErrorUser = "";
            this.RErrorPass = "";
            this.maxLErrorPass = "";
            this.minLErrorPass = "";
            this.RErrorEmail = "";
            this.ErrorEmail = "";
            this.minLErrorUser = "";
            this.RErrorPhone = "";
            this.minPhone = "";
           
         }
        
         else if (this.fGroup.value.nm_usuario === 0)
         {
          this.RErrorUser = "Por favor, digite um nome de usuário válido!";
      
         }

         else if (this.fGroup.value.cd_senha === 0)
         {
          this.RErrorPass = "Por favor, digite uma senha valida!";
      

         }
        }

}
