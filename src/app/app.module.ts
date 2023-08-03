import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainModule } from './modules/main/main.module';
import { EndModule } from './modules/end/end.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { GamedataService } from './core/services/gameservice/gamedata.service';
import { LoginModule } from './modules/login/login.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FishDataService } from './core/services/fishService/fish-data.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    HttpClientModule,
    EndModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    GamedataService,
    FishDataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
