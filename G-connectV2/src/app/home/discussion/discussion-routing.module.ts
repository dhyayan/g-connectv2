import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscussionPage } from './discussion.page';

const routes: Routes = [
  {
    path: '',
    component: DiscussionPage
  },
  {
    path: 'creatediscussion',
    loadChildren: () => import('./create-discussion/create-discussion.module').then( m => m.CreateDiscussionPageModule)
  },
  {
    path: 'showdiscussion/:id',
    loadChildren: () => import('./show-discussion/show-discussion.module').then( m => m.ShowDiscussionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscussionPageRoutingModule {}
