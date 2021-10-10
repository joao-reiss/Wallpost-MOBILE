import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  constructor(public toastcontroller: ToastController) { }

  ngOnInit() {
    this.talvez = "false";
  }

  talvez = "false";
  username:any;


  async setEmail()
  {
    this.talvez = "true";
    const toast = await this.toastcontroller.create({
      message: "Um email com instruções foi enviado, siga os passos para completar a recuperação", cssClass: "toastClass",  duration: 10000, position: "middle"
      });
        toast.present();
  }
}
