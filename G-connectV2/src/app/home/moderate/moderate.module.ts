import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModeratePageRoutingModule } from './moderate-routing.module';

import { ModeratePage } from './moderate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModeratePageRoutingModule
  ],
  declarations: [ModeratePage]
})
export class ModeratePageModule {}
