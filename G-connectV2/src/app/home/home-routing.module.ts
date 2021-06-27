import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'discussion',
        loadChildren: () => import('./discussion/discussion.module').then( m => m.DiscussionPageModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
      },
      {
        path: 'moderate',
        loadChildren: () => import('./moderate/moderate.module').then( m => m.ModeratePageModule)
      },
      {
        path: 'allusers',
        loadChildren: () => import('./all-users/all-users.module').then( m => m.AllUsersPageModule)
      },
      {
        path: 'my-profile',
        loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
