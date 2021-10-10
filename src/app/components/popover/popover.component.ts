import { UserService } from './../../services/user.service';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(public route: Router, 
    public popOverCtrl:PopoverController, 
    public configRoute: Router, 
    private usuario: UserService) { }
  
  img:boolean = true;
  // show:boolean = true;
  user:any = {
    idusuario:'',
    nm_usuario: '',
    imagem_user: ''
  };

  ngOnInit(){}

  ionViewWillEnter() 
  {
    const user  = JSON.parse(localStorage.getItem('usuario'))
    this.user.idusuario = user.idusuario;
    this.img = false;
    
    this.usuario.dataUser(this.user.idusuario).subscribe((data) =>{
      localStorage.setItem('usuario',  JSON.stringify(data))
      this.user.nm_usuario = data['nm_usuario'];
      this.user.imagem_user = data['imagem_user'];

    });

  if(user.imagem_user != null || user.imagem_user === "")
    {
      this.img = true;
      this.user.imagem_user = user.imagem_user;
    }
    else
    {
      this.img = false;
      this.user.imagem_user = null;
    }
    this.user.nm_usuario = user.nm_usuario;
    
  }

  sair()
  {      
      // localStorage.setItem('login', '')

    // this.show = true;
    // 
    setTimeout(() =>{
      this.route.navigate(['/login']);
     
      // this.show = false;
      this.popOverCtrl.dismiss();
    }, 1000)

  
  }

  ConfigPage()
  {
    this.configRoute.navigate(['/config']);
    this.popOverCtrl.dismiss();
  }
}
