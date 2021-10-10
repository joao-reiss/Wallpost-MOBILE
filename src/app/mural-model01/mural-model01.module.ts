import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MuralModel01PageRoutingModule } from './mural-model01-routing.module';

import { MuralModel01Page } from './mural-model01.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MuralModel01PageRoutingModule
  ],
  declarations: [MuralModel01Page]
})
export class MuralModel01PageModule {}
