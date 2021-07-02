import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllUsersPage } from './all-users.page';

const routes: Routes = [
  {
    path: '',
    component: AllUsersPage,
  },
      {
        path: 'profile/:email',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllUsersPageRoutingModule {}
