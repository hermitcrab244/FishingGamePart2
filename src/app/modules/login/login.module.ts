import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, LoginPageComponent],
  imports: [CommonModule, MaterialModule],
})
export class LoginModule {}
