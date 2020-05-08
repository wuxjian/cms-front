import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {ManageLayoutComponent} from './pages/manage/manage-layout/manage-layout.component';
import {AuthGuard} from './auth/auth.guard';
import {ArticleListComponent} from './pages/article/article-list/article-list.component';
import {FileListComponent} from './pages/file/file-list/file-list.component';


const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'manage', component: ManageLayoutComponent, canActivate: [AuthGuard], children: [
      {
        path: 'article', canActivate: [AuthGuard], children: [
          {path: '', component: ArticleListComponent, pathMatch: 'full'},
          // {path: 'list', component: ArticleListComponent}
        ]
      },
      {
        path: 'file', canActivate: [AuthGuard], children: [
          {path: '', component: FileListComponent, pathMatch: 'full'}
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
