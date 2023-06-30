import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnChanges, OnInit {
  @Input() score: number = 0;
  @Input() fish: string = '';
  @Input() choice: string = '';

  playerName = 'Test';
  totalScore: number = 0;
  totalCasts: number = 0;
  lastCatch = '';
  keptFish: string[] = [];

  ngOnInit(): void {
    this.totalCasts = 0;
    this.lastCatch = 'No catches yet';
  }

  ngOnChanges() {
    this.totalCasts++;
    this.totalScore = this.totalScore + (this.score || 0);
    this.lastCatch = this.fish;

    if (this.choice === 'kept') {
      this.keptFish.push(this.fish);
    }
  }

  bucketClick() {
    console.log('Button works!');
  }
}
