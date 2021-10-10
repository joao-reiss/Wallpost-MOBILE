import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController, LoadingController, Platform, NavController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component'
import { User } from '../Interfaces/userInterface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-post-model01',
  templateUrl: './post-model01.page.html',
  styleUrls: ['./post-model01.page.scss'],
})
export class PostModel01Page implements OnInit {

  constructor(
  public popoverController: PopoverController,
  private toastController:ToastController,
  private load:LoadingController,
  private route: Router,
  public iab: InAppBrowser,
  public platform: Platform,
  public navCtrl: NavController
   ) {}


  link = false;
  img:boolean = true;

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

  post: any = [];

  ionViewDidEnter()
  { 
    const mural  = JSON.parse(localStorage.getItem('muralDados'))
    const user  = JSON.parse(localStorage.getItem('usuario'))
    this.user.nm_usuario = mural.usuario.nm_usuario;
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

      
        const post  = JSON.parse(localStorage.getItem('postDados'))
        this.post = post;
     
        if(this.post.cd_link != "")
        {
          this.link = true;
        }else{
          this.link = false;
        }
        console.clear()
 
  }
  ngOnInit() {}

 

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
      window.location.reload();
      event.target.complete();
    }, 2000);
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
  
  btnBack()
  {
    this.route.navigate(['/mural-model01']);
    this.Load();
  }

  openLink()
  {
    
      let url = this.post.cd_link;
  
      if (url.indexOf("https://") == 0) {
         
      }
      else if(url.indexOf("http://") == 0){
  
        url = url.replace(/^http:\/\//i, 'https://');
        
  
      }
      else
      {
        url= "https://" + url; 
       
      }
  
      this.iab.create(url,'_system', 'location=yes');
    }

}
