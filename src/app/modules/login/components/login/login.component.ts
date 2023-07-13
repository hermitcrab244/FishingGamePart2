import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  login() {
    this.router.navigate(['/main-page']);
  }

  openRegister() {
    this.dialog.open(RegistrationComponent);
  }
}
