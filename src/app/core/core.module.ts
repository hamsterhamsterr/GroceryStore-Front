import { NgModule } from '@angular/core';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from 'shared/shared.module';
import { LoginASPComponent } from './components/login-asp/login-asp.component';
import { SignUpAspComponent } from './components/sign-up-asp/sign-up-asp.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginASPComponent,
    SignUpAspComponent,
  ],
  exports: [BsNavbarComponent],
})
export class CoreModule {}
