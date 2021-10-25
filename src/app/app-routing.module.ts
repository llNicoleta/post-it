import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import {ModeratorGuard} from "./shared/guards/moderator.guard";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {UserGuard} from "./shared/guards/user.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'sign-in', canActivate: [UserGuard], component: SignInComponent },
  { path: 'sign-up', canActivate: [UserGuard], component: SignUpComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'dashboard', canActivate: [ModeratorGuard], component: DashboardComponent },
  { path: 'user/:id', component: UserProfileComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
