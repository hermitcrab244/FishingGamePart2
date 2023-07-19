import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GamedataService } from 'src/app/core/services/gameservice/gamedata.service';
import { BackendService } from 'src/app/core/services/backendService/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  form: FormGroup;
  username!: string;
  password!: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private gamedataSerive: GamedataService,
    private backendService: BackendService
  ) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;

      this.username = this.form.get('username')?.value;

      // Calls login method from service
      this.backendService.loginUser(username, password).subscribe(
        (response) => {
          // Navigates if login is successful
          console.log('Login successful: ', response);
          this.gamedataSerive.playerName = username;
          this.router.navigate(['/main-page']);
        },
        (error) => {
          console.error('Login failed: ', error);
        }
      );
    }
  }

  openRegister() {
    this.dialog.open(RegistrationComponent, { width: '25%' });
  }
}
