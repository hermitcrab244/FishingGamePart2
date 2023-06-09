import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard/scoreboard.component';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations: [MainPageComponent, ScoreboardComponent, GameComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MainPageComponent],
})
export class MainModule {}
