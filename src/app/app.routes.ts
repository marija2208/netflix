import { Routes } from '@angular/router';import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChooseProfileComponent } from './chooseprofile/chooseprofile.component';
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'chooseProfile', component:ChooseProfileComponent},
    {path:'dashboard', component:DashboardComponent},



];
