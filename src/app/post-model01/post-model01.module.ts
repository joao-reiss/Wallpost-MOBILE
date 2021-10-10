import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostModel01PageRoutingModule } from './post-model01-routing.module';

import { PostModel01Page } from './post-model01.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostModel01PageRoutingModule
  ],
  declarations: [PostModel01Page]
})
export class PostModel01PageModule {}
