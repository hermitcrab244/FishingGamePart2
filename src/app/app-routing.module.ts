import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './modules/main/pages/main-page/main-page.component';
import { EndPageComponent } from './modules/end/pages/end-page/end-page.component';
import { LoginPageComponent } from './modules/login/pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: 'main-page', component: MainPageComponent },
  { path: 'end-page', component: EndPageComponent },
  { path: 'login-page', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
