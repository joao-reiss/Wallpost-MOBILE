import { Router } from '@angular/router';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { MuralService } from './../services/mural.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { PopoverController, LoadingController, ToastController } from '@ionic/angular';
import { AcessCodeComponent } from './../compCode/acess-code/acess-code.component';
import { PopoverComponent } from '../components/popover/popover.component';
import { Platform } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  dataMural: any = {
    idmural: ''
  }
  user: any = {
    nm_usuario:'',
    cd_senha:'',
    ds_email:'',
    ds_celular:'',
    imagem_user: ''
  };

  qrScan:any;
  results:string;

  img:boolean = true;
  fGroup: FormGroup;

  constructor(
    public popoverController: PopoverController,
    public codeComp: AcessCodeComponent,
    public load: LoadingController,
    public fBuilder: FormBuilder,
    public mural: MuralService,
    public qr: QRScanner,
    public platform: Platform,
    public dialog: Dialogs,
    public route: Router,
    public toast: ToastController,
    public animationCtrl: AnimationController) {
      

      this.fGroup = this.fBuilder.group({
        idmural: [this.dataMural.idmural, Validators.compose([
          Validators.required
        ])],
    })

      //Desativa o Scanner quando o botão é pressionado
      this.platform.backButton.subscribeWithPriority(0,()=>{
        document.getElementsByTagName("body")[0].style.opacity="1";
        this.qrScan.unsubscribe
      })
  }

  

  ionViewDidEnter()
  {
    const user  = JSON.parse(localStorage.getItem('usuario'))
    
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
    console.clear()
  }

  async compAcess(ev:any)
  {
    const popover = await this.popoverController.create({
      component: AcessCodeComponent,
      cssClass: 'myCode',
      event: ev,
      translucent: true,
      enterAnimation: this.enterAnimation
    });
    await popover.present();
  }


  async showPopOver(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
     
    });
    await popover.present();

  }

  Load() {
    this.load.create({
      message:'<div class="ondinhas"><ion-row><ion-col size="12"><p class="logo"> WALLPOST </p></ion-col></ion-row>' + 
      '<ion-row><ion-col size="12"><p class="ld"> Carregando </p></ion-col></ion-row>' +
      '<ion-row><ion-col size="12"> <div id="spinner"> <ion-spinner class"spinner" name="dots"></ion-spinner></div> </ion-col></ion-row></div>' ,
      spinner: null,
      duration: 1500,
      cssClass:'cssLoad',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
  }


  QrScanner()
  {
    this.qr.prepare().then((status:QRScannerStatus)=>{
      if(status.authorized)
      {
        this.qr.show();
        document.getElementsByTagName("body")[0].style.opacity = "0";
        this.qrScan = this.qr.scan().subscribe((textFound)=>{
          document.getElementsByTagName("body")[0].style.opacity = "1";
          this.qrScan.unsubscribe();
          this.results = textFound;
          this.ResultadoQR();
          
        },(err)=>{
          this.dialog.alert(JSON.stringify(err));
        })
      }
      else if(status.denied)
      {
       
      }
      else{

      }
    })
  }


  ResultadoQR()
  {
    this.fGroup.value.idmural = this.results;
    this.mural.QrCode(this.fGroup.value).subscribe((data:any)=>{
     
      console.log(data)
      if(data[0] === "privado")
      {
        this.compAcess(true);
        this.privado();
      }else
      {
        this.Load();
        this.Dados(data);
      }

    });
  
  }

  Dados(dados)
  {
    this.mural.getDataMuralById(dados).subscribe((data) =>{
      localStorage.setItem('muralDados', JSON.stringify(data))
      localStorage.setItem('Vinculado?', null);
      this.route.navigate(['/mural-model01']);
      setTimeout(() => {
         this.qrScan.cancelScan();
      }, 2000);
     
    });
  }

  muralPage()
  {

    this.qrScan.cancelScan();
    this.route.navigate(['/mural-model01']);

  }

  async privado()
  {
    const toast = await this.toast.create({
        message: "Mural Privado, Será necessário o código de acesso!", cssClass: "toastClass",  duration: 3000, position: "bottom"
        });
          toast.present();

          setTimeout(() => {
            this.qrScan.cancelScan();
          }, 2500);
  }


  private enterAnimation = (baseEl: any) => {
    const backdropAnimation = this.animationCtrl.create()
      .addElement(baseEl.querySelector('ion-backdrop'))
      .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
      .beforeStyles({
        'pointer-events': 'none'
      })
      .afterClearStyles(['pointer-events']);

    // You could alos define the popover-content
    // transform here if you wanted it to
    // still have a scale effect
    const transformAnimation = this.animationCtrl.create()
      .addElement(baseEl.querySelector('.popover-content'))
      .afterStyles( {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      });

    const wrapperAnimation = this.animationCtrl.create()
    .addElement(baseEl.querySelector('.popover-wrapper'))
    .addElement(baseEl.querySelector('.popover-viewport'))
    .fromTo('opacity', 0.01, 1);

    return this.animationCtrl.create()
      .addElement(baseEl)
      .easing('cubic-bezier(0.36,0.66,0.04,1)')
      .duration(300)
      .addAnimation([backdropAnimation, wrapperAnimation, transformAnimation]);
  }
}
