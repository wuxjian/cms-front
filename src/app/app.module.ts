import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { ManageComponent } from './pages/manage/manage.component';

export function init_app() {
  return () => {
    console.log('init');
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
