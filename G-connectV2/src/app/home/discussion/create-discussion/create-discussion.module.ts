import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDiscussionPageRoutingModule } from './create-discussion-routing.module';

import { CreateDiscussionPage } from './create-discussion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDiscussionPageRoutingModule
  ],
  declarations: [CreateDiscussionPage]
})
export class CreateDiscussionPageModule {}
