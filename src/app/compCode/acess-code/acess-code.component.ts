import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MuralService } from './../../services/mural.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acess-code',
  templateUrl: './acess-code.component.html',
  styleUrls: ['./acess-code.component.scss'],
})
export class AcessCodeComponent implements OnInit {

  constructor(
    public muralService: MuralService,
    public popOver: PopoverController, 
    public router:Router,
    public toastcontroller: ToastController,
    private fBuilder: FormBuilder,
    private load: LoadingController
    ){

      this.fGroup = this.fBuilder.group({
        cd_chave: [this.chave.cd_chave, Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(25)
        ])]
    });

    }
  public fGroup: FormGroup; 
  
  time:number = 6000;
  chave:any = {
    cd_chave: null
  };

  Data;
  
  buscarChave()
  {
    if(this.fGroup.value.cd_chave != null && this.fGroup.value.cd_chave != "")
    {
      this.Load();
      this.muralService.chaveAcesso(this.fGroup.value).subscribe((data:any) =>{
        this.Data = true;
        this.popOver.dismiss();
        this.chave.cd_chave = data;
        this.mural();
  
      },(error:HttpErrorResponse) => {
        console.error(error)
        this.notSuccess();
        this.Data = false;
      
      });


    }
    else
    {
      this.notSuccess();
    }

  }

  async notSuccess()
  {
    this.load.dismiss();
    const toast = await this.toastcontroller.create({
      message: "Código Inválido!", cssClass: "toastClass",  duration: 1500, position: "bottom"
      });
        toast.present();
  }

  mural()
  {
    if(this.Data == true)
    {
        this.load.dismiss();
        this.muralService.getDataMuralById(this.chave.cd_chave).subscribe((data:any) =>{
          localStorage.setItem('Vinculado?',  null)
          localStorage.setItem('muralDados',  JSON.stringify(data))
          this.router.navigateByUrl('/mural-model01');
    
        });
        
    }

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
  

  ngOnInit() {}

}
