import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscussionPageRoutingModule } from './discussion-routing.module';

import { DiscussionPage } from './discussion.page';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { ShowDiscussionPage } from './show-discussion/show-discussion.page';
import { CreateDiscussionPage } from './create-discussion/create-discussion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscussionPageRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),

  ],
  declarations: [DiscussionPage,ShowDiscussionPage,CreateDiscussionPage]
})
export class DiscussionPageModule {}
