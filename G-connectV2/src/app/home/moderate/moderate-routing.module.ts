import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModeratePage } from './moderate.page';

const routes: Routes = [
  {
    path: '',
    component: ModeratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModeratePageRoutingModule {}
