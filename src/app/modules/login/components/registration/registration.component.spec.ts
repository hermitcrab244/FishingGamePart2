import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RegistrationComponent } from './registration.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let mockDialogRef: MatDialogRef<RegistrationComponent>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientTestingModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.form.get('username')).toBeDefined();
    expect(component.form.get('password')).toBeDefined();
    expect(component.form.get('confirmPassword')).toBeDefined();
  });

  it('should be invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should be valid when populated', () => {
    component.form.setValue({
      username: 'test',
      password: 'test',
      confirmPassword: 'test',
    });

    expect(component.form.valid).toBeTruthy();
  });
});
