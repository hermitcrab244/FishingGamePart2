import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GamedataService } from 'src/app/core/services/gameservice/gamedata.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockDialog: MatDialog;

  beforeEach(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      providers: [
        GamedataService,

        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.form.get('username')).toBeDefined();
    expect(component.form.get('password')).toBeDefined();
  });

  it('should be invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should be valid when populated', () => {
    component.form.setValue({
      username: 'test',
      password: 'test',
    });

    expect(component.form.valid).toBeTruthy();
  });

  it('should open registration on button click', () => {
    component.openRegister();
    expect(mockDialog.open).toHaveBeenCalledOnceWith(jasmine.any(Function), {
      width: '25%',
    });
  });
});
