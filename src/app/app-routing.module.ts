import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'mural-model01',
    loadChildren: () => import('./mural-model01/mural-model01.module').then( m => m.MuralModel01PageModule)
  },
  {
    path: 'post-model01',
    loadChildren: () => import('./post-model01/post-model01.module').then( m => m.PostModel01PageModule)
  },
  {
    path: 'alterar-senha',
    loadChildren: () => import('./alterar-senha/alterar-senha.module').then( m => m.AlterarSenhaPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./configuracoes/config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
