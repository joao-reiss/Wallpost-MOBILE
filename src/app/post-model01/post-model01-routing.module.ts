import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostModel01Page } from './post-model01.page';

const routes: Routes = [
  {
    path: '',
    component: PostModel01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostModel01PageRoutingModule {}
