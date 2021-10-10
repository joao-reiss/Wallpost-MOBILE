import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcessCodeComponent } from './compCode/acess-code/acess-code.component';
import { PopoverComponent } from './components/popover/popover.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy} from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent, AcessCodeComponent, PopoverComponent],
  entryComponents: [AcessCodeComponent, PopoverComponent],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(),  AppRoutingModule,  FormsModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AcessCodeComponent, Camera, InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule {}
