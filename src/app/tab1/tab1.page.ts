import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { MuralService } from './../services/mural.service';
import { Component } from '@angular/core';
import { PopoverController, LoadingController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { User } from '../Interfaces/userInterface';
import { Mural } from '../Interfaces/muralInterface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  user: any = {
    idusuario:'',
    nm_usuario:'',
    cd_senha:'',
    ds_email:'',
    ds_celular:'',
    imagem_user: ''
  };

  mural:any = [];
  muralPesquisado: [];
  
  refresh:boolean;
  img:boolean = true;
  isItemAvailable = false;

  constructor(
  public popoverController: PopoverController,
  private muralService: MuralService,
  private route: Router, 
  private load:LoadingController,
  private usuario: UserService) {}


  ionViewDidEnter()
  {
    this.Load();
    localStorage.setItem('muralDados',  null);
    localStorage.setItem('Vinculado?',  null);

    const user  = JSON.parse(localStorage.getItem('usuario'))

    this.user.idusuario = user.idusuario;
    this.img = false;
    
    this.usuario.dataUser(this.user.idusuario).subscribe((data: User) =>{
      this.user.nm_usuario = data['nm_usuario'];
      this.user.imagem_user = data['imagem_user'];

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
    
  this.muralService.getDataMural(this.user.idusuario).subscribe((data: any) => {
    
    localStorage.setItem('mural', JSON.stringify(data))
    this.mural = data['murais_vinculados'];
    this.load.dismiss();
  });

  setTimeout(() => {
    this.load.dismiss();
  }, 4000);

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
   
  

      async enterMural(id)
    {

      this.Load();
      this.muralService.getDataMuralById(id).subscribe((data: Mural) => {
        localStorage.setItem('muralDados',  JSON.stringify(data))
        localStorage.setItem('Vinculado?',  's');
        this.load.dismiss();
        this.route.navigate(['/mural-model01']);
        
      });
     
     
     
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
    
    
    notFound()
    {
      this.route.navigateByUrl('/tabs/tab2');
    }



    getItems(ev: any) {

      const val = ev.target.value;
      const mural  = JSON.parse(localStorage.getItem('mural'))  
      this.mural = mural.murais_vinculados;

      if (val && val.trim() !== '')
        {
        this.isItemAvailable = true;
        
        this.muralPesquisado = this.mural.filter((mural) => {
          return (mural.mural.nm_mural.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      } 
      else 
      {
         this.isItemAvailable = false;
      }

  }


}
