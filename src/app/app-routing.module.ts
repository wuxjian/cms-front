import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {ManageLayoutComponent} from './pages/manage/manage-layout/manage-layout.component';
import {AuthGuard} from './auth/auth.guard';
import {FilesComponent} from './pages/files/files.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'manage', component: ManageLayoutComponent, canActivate: [AuthGuard], children: [
      {path: '', component: DashboardComponent, pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'files', component: FilesComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
