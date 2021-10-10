import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';

@Component ({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor(private usuario: UserService,
    private load:LoadingController,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public el: ElementRef,
    private fBuilder: FormBuilder,
    public toast:ToastController,
    public route:Router,
    public camera: Camera) {

      const user  = JSON.parse(localStorage.getItem('usuario'))
      this.user.nm_usuario = user.nm_usuario;
      this.user.ds_email = user.ds_email;
      this.user.ds_celular = user.ds_celular;
      

      this.fGroup = this.fBuilder.group({
        ds_email: [this.user.ds_email, Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
        ])],
        nm_usuario: [this.user.nm_usuario, Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(45),
        ])],
        ds_celular: [this.user.ds_celular, Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(45),
        ])],

        imagem_user: [this.user.imagem_user, Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(45),
        ])]

    });
     }

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
  };

  
  editFile: boolean = true;
  aux:any;

  ifUserError:any = {

    minError: null,
    maxError: null,
    Required: null,
    Email: null,
    RequiredEmail:null,
    minEmailError: null,
    maxEmailError: null,
    RequiredCel: null,
    minCelError: null,

  };
  newImg = false;
  removeUpload: boolean = false;
  public fGroup: FormGroup; 

  registrationForm = this.fb.group({
    file: [null]
  })  


  ngOnInit() 
  {
    this.Load();
  }

  ionViewDidEnter()
  {
    
    
    const user  = JSON.parse(localStorage.getItem('usuario'))
    this.user.idusuario = user.idusuario;
    this.usuario.dataUser(this.user.idusuario).subscribe((data) =>{
      this.user.idusuario = data['idusuario'];
      this.user.nm_usuario = data['nm_usuario'];
      this.user.ds_celular = data['ds_celular'];
      this.user.ds_email = data['ds_email'];
    });

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

  
  Load() {
    this.load.create({
      message:'<div class="ondinhas"><ion-row><ion-col size="12"><p class="logo"> WALLPOST </p></ion-col></ion-row>' + 
      '<ion-row><ion-col size="12"><p class="ld"> Carregando </p></ion-col></ion-row>' +
      '<ion-row><ion-col size="12"> <div id="spinner"> <ion-spinner class"spinner" name="dots"></ion-spinner></div> </ion-col></ion-row></div>' ,
      spinner: null,
      duration: 500,
      cssClass:'cssLoad',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
  }
  openGallery(){
    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((ImageData) => {
      this.newImg = true;
      this.aux = ImageData;

      this.user.imagem_user = this.aux;

    }, (err) => {
    })
  } 
  
  
  // uploadFile(event) {
  //   let reader = new FileReader();
  //   let file = event.target.files[0];
  //   const max_size = 2000000;
  //   if (event.target.files && event.target.files[0]) {
  //     if(event.target.files[0].size <  max_size)
  //     {
  //         reader.readAsDataURL(file);
  //         reader.onload = () => {
  //           this.newImg = true;
  //           this.aux = reader.result;
  //           this.aux = this.aux.replace(/^data:image\/[a-z]+;base64,/, "");
  //           // console.log(this.aux)
  //           this.fGroup.patchValue({
  //             imagem_user: this.aux
  //           });
  //           this.editFile = false;
  //           this.removeUpload = true;
  //           this.user.imagem_user  =this.aux;
  //           this.cd.markForCheck();    
  //       }
       
  //       // this.user.imagem_user = this.aux;
  //       this.fGroup.patchValue({
  //         imagem_user: this.aux
  //       });
       
  //     }
  //     else
  //     {
  //       this.NoImage();
  //     }
         
  //   }
  // }

    Salvar(formGroup: FormGroup)
    {

      if(this.fGroup.value.nm_usuario!==0)
      {
       
            if(this.fGroup.controls.nm_usuario.errors)
          {
            
            if(this.fGroup.controls.nm_usuario.errors.required)
            {
              this.ifUserError.Required = "Este campo é obrigatório!";
            }

            if(this.fGroup.controls.nm_usuario.errors.minlength)
            {
              this.ifUserError.Required = "";
              this.ifUserError.minError = "O nome de usuário deve conter no mínimo 5 caracteres!";
      
            }

            if(this.fGroup.controls.nm_usuario.errors.maxLength)
            {
              this.ifUserError.maxError = "O nome de usuário deve conter no máximo 25 caracteres!";
            }

      }

      }
      else
      {
        this.ifUserError.Required = "Este campo é obrigatório!";
      }
      
     

        if(this.fGroup.controls.ds_email.errors)
        {
            if(this.fGroup.controls.ds_email.errors.required)
            {
              this.ifUserError.RequiredEmail = "Este campo é obrigatório!";
            }

            else if(this.fGroup.controls.ds_email.errors.email || this.fGroup.controls.ds_email.errors.pattern)
            {
              this.ifUserError.RequiredEmail = "";
              this.ifUserError.Email = "Email inválido!";
            }


        }


        // if(this.fGroup.controls.ds_celular.errors)
        // {
        //     if(this.fGroup.controls.ds_celular.errors.required  || this.fGroup.controls.ds_celular.errors.pattern)
        //     {
        //       this.ifUserError.RequiredCel = "Este campo é obrigatório!";
        //     }

        //     else if(this.fGroup.controls.ds_celular.errors.minLength)
        //     {
        //       this.ifUserError.RequiredCel = "";
        //       this.ifUserError.minErrorCel = "O número deve conter ao menos 15 digitos!";
        //     }


        // }
        
        

      // else if(!this.fGroup.controls.nm_usuario && !this.fGroup.controls.imagem_user && !this.fGroup.controls.ds_email.errors && !this.fGroup.controls.ds_celular.errors && this.fGroup.value.nm_usuario != 0 && this.fGroup.value.cd_senha !=0)
        else
      {

       if(this.fGroup.value.ds_celular === "" || this.fGroup.value.ds_celular === 0 || this.fGroup.value.ds_celular === null)
      {
        const user  = JSON.parse(localStorage.getItem('usuario'))
        this.fGroup.value.ds_celular = user.ds_celular;
        
      }
      this.fGroup.value.imagem_user = this.aux;
      this.usuario.Update(this.user.idusuario, this.fGroup.value).subscribe((data) =>{
        this.Save();
      });

      
        
          
        
      
       
     }
    
     if (this.fGroup.value.nm_usuario === 0)
     {
      this.ifUserError.Required = "Por favor, digite um nome de usuário válido!";
  
     }

    
    }


    async NoImage()
    {
      
      const toast = await this.toast.create({
        message: "O Tamanho da imagem deve ser menor que 2MB!", cssClass: "toastClass",  duration: 1500, position: "bottom"
        });
          toast.present();
    }

    async Save()
    {
      const toast = await this.toast.create({
        message: "Informações Alteradas!", cssClass: "toastClass",  duration: 2000, position: "bottom"
        });
          toast.present();
    }


    async doRefresh(event) {

      setTimeout(() => {
        window.location.reload();
        const user  = JSON.parse(localStorage.getItem('usuario'))
        this.user.idusuario = user.idusuario;
        this.usuario.dataUser(this.user.idusuario).subscribe((data) =>{
          localStorage.setItem('usuario',  JSON.stringify(data))
          this.user.idusuario = data['idusuario'];
          this.user.nm_usuario = data['nm_usuario'];
          this.user.ds_celular = data['ds_celular'];
          this.user.ds_email = data['ds_email'];
          event.target.complete();
        });
      }, 2000);
    }


    btnBack()
    {
      this.route.navigate(['/tabs/tab1']);
      this.usuario.dataUser(this.user.idusuario).subscribe((data) =>{
      localStorage.setItem('usuario', JSON.stringify(data));
      });
    }



}
