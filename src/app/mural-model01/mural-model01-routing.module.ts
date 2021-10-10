import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MuralModel01Page } from './mural-model01.page';

const routes: Routes = [
  {
    path: '',
    component: MuralModel01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MuralModel01PageRoutingModule {}
