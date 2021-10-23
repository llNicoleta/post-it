import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'user/:id', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
