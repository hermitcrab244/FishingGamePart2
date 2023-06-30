import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  score!: number;
  fish!: string;
  choice!: string;

  sendResults(score: number, fish: string, choice: string) {
    this.score = score;
    this.fish = fish;
    this.choice = choice;
  }
}
