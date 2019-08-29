import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { WeathersComponent } from './weathers/weathers.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'weathers', component: WeathersComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
