import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {AuthGuard} from './_guards/auth.guard';

import { UsersService } from './_services/user.service';
import { RolesService } from './_services/role.service';
import { WeatherService } from './_services/weather.service';
import { CustomHttpInterceptorService } from './_services/CustomHttpInterceptorService.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UsersService,
    RolesService,
    WeatherService,
    {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true},
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
