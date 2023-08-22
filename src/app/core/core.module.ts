import { NgModule } from '@angular/core';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [BsNavbarComponent, HomeComponent, LoginComponent],
  exports: [BsNavbarComponent],
})
export class CoreModule {}
