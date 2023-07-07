import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndComponent } from './components/end/end.component';
import { MaterialModule } from '../shared/material.module';
import { EndPageComponent } from './pages/end-page/end-page.component';

@NgModule({
  declarations: [EndComponent, EndPageComponent],
  imports: [MaterialModule, CommonModule],
})
export class EndModule {}
