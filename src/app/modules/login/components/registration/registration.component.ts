import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/core/services/backendService/backend.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  hide = true;
  form: FormGroup;
  username!: string;
  password!: string;
  confirmPassword!: string;

  constructor(
    public RegDialogRef: MatDialogRef<RegistrationComponent>,
    private formBuilder: FormBuilder,
    private backendService: BackendService
  ) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  submitReg() {
    if (
      this.form.valid &&
      this.form.controls['password'].value ===
        this.form.controls['confirmPassword'].value
    ) {
      const username = this.form.controls['username'].value;
      const password = this.form.controls['password'].value;

      // Call method from service
      this.backendService.registerUser(username, password).subscribe(
        (response) => {
          console.log(this.form.value);
          console.log('Registration successful: ', response);
          this.RegDialogRef.close(this.form);
        },
        (error) => {
          console.error('registration failed: ', error);
        }
      );
    }
  }
}
