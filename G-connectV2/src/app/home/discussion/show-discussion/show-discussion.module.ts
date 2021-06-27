import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowDiscussionPageRoutingModule } from './show-discussion-routing.module';

import { ShowDiscussionPage } from './show-discussion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowDiscussionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ShowDiscussionPage]
})
export class ShowDiscussionPageModule {}
