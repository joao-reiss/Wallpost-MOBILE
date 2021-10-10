
import { MuralService } from './../services/mural.service';
import { PostService } from './../services/post.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController, LoadingController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../Interfaces/userInterface';
import { Mural } from '../Interfaces/muralInterface';

@Component({
  selector: 'app-mural-model01',
  templateUrl: './mural-model01.page.html',
  styleUrls: ['./mural-model01.page.scss'],
})
export class MuralModel01Page implements OnInit {

  constructor(
  public popoverController: PopoverController,
  private postService: PostService,
  private muralService: MuralService, 
  private load:LoadingController,
  private route: Router,
  private fBuilder: FormBuilder) 
{ 
  const mural  = JSON.parse(localStorage.getItem('muralDados'))
  const user  = JSON.parse(localStorage.getItem('usuario'))
      this.fGroup = this.fBuilder.group({
        idusuario: [user.idusuario, Validators.compose([
          Validators.required
        ])],
        idmural: [mural.idmural, Validators.compose([
          Validators.required
        ])]
    });

}
  public fGroup: FormGroup;

  public user: User = {
    idusuario: null,
    nm_usuario: null,
    cd_senha: null,
    ds_email: null,
    ds_celular: null,
    cd_cpf: null,
    cd_cpnj: null,
    imagem_user: null,
  };

   public mural: Mural = {
    idmural:null,
    nm_mural: null,
    ic_public: null,
    id_qrcode: null,
    ds_mural: null,
  };
  aux:any;
  
 
  post:any = [];
 
  img:boolean = true;
  favorito: any = "Vinculado";
  tgFavorite: boolean = true;

  async ionViewDidEnter()
  {
    this.tgChoose();
    const user  = JSON.parse(localStorage.getItem('usuario'))
    this.user.idusuario = user.idusuario;
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

   
      const mural  = JSON.parse(localStorage.getItem('muralDados'))
        this.user.nm_usuario = mural.usuario.nm_usuario;
        
        this.mural.idmural = mural.idmural;
        this.mural.nm_mural = mural.nm_mural;
        this.mural.ds_mural = mural.ds_mural;
        this.mural.id_qrcode = mural.id_qrcode;
        this.post = mural.posts;
   
     
    console.clear()   
  }

  ngOnInit(){}

  tgChoose()
  {
    const vinculado = localStorage.getItem('Vinculado?');
    this.aux = vinculado;
    if(vinculado == 's')
    {
      this.tgFavorite = true;
      this.favorito = 'Vinculado';
    }else{
      this.tgFavorite = false;
      this.favorito = 'Sem Vinculo';
    }
  }


  SwFav()
  {
    const vinculado = localStorage.getItem('Vinculado?');
    if(vinculado != 's')
    {
      if(this.tgFavorite == true)
      {
        this.favorito = "Vinculado";
        this.muralService.addAcesso(this.fGroup.value).subscribe((data)=> {
        localStorage.setItem('Vinculado?',  's');
        localStorage.setItem('Desvinculado?',  null);
          console.log('Vinculado')
        });
      }
      else
      {
        this.favorito = "Sem Vinculo";
         this.muralService.destroyAcesso(this.fGroup.value).subscribe((data)=> {
          localStorage.setItem('Vinculado?',  null);
          localStorage.setItem('Desvinculado?',  's');
          console.log('Desvinculado')
        });
        
      }
    }

    else
    {

        if(this.tgFavorite == false)
        {
          this.favorito = "Sem Vinculo";
          this.muralService.destroyAcesso(this.fGroup.value).subscribe((data)=> {
            localStorage.setItem('Vinculado?',  null);
            localStorage.setItem('Desvinculado?',  's');
            console.log('Desvinculado')
          });
        
        }
        
    
    }

    
  }


  async showPopOver(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

  }



  async doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
      window.location.reload();
    }, 2000);
  }


  Load() {
    this.load.create({
      message:'<div class="ondinhas"><ion-row><ion-col size="12"><p class="logo"> WALLPOST </p></ion-col></ion-row>' + 
      '<ion-row><ion-col size="12"><p class="ld"> Carregando </p></ion-col></ion-row>' +
      '<ion-row><ion-col size="12"> <div id="spinner"> <ion-spinner class"spinner" name="dots"></ion-spinner></div> </ion-col></ion-row></div>' ,
      spinner: null,
      duration: null,
      cssClass:'cssLoad',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
  }

  async postPage(id)
  {
    this.Load();
    
    this.postService.getDataPostById(id).subscribe((data) => {
    localStorage.setItem('postDados',  JSON.stringify(data))
    this.route.navigateByUrl('/post-model01');
    this.load.dismiss();
    });
  
  }

    
  
  back()
  {
    this.route.navigateByUrl('/tabs/tab1');
    localStorage.removeItem('postDados')
    localStorage.setItem('muralDados',  null);
    localStorage.setItem('Vinculado?',  null);
  }
}
