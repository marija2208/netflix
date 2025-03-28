import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChooseProfileComponent } from './chooseprofile/chooseprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './home/home.component';
import { MoviePlayerPageComponent } from './movie-player/movie-player.component';
import { LoginGuard } from './services/login.guard';

export const routes: Routes = [
    {path:'', component:HomeComponent, canActivate:[LoginGuard]},
    { path: 'login', component: LoginComponent, canActivate:[LoginGuard] },
    { 
      path: 'chooseProfile', 
      component: ChooseProfileComponent,
      canActivate: [AuthGuard]
    },
    { 
        path: 'watch/:id', 
        component: MoviePlayerPageComponent,
        canActivate: [AuthGuard]
      },
    { 
      path: 'dashboard', 
      component: DashboardComponent,
      canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '/login' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }