import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
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
      console.log(this.form.value);
      this.RegDialogRef.close(this.form);
    }
  }
}
