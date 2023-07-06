import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BucketComponent } from '../../bucket/bucket.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnChanges, OnInit {
  BucketDialogRef!: MatDialogRef<BucketComponent>;

  @Input() score: number = 0;
  @Input() fish: string = '';
  @Input() choice: string = '';

  playerName = 'Test';
  totalScore: number = 0;
  totalCasts: number = 0;
  lastCatch = '';
  keptFish: string[] = [];

  constructor(public dialog: MatDialog) {}

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
    this.BucketDialogRef = this.dialog.open(BucketComponent, {
      width: '20%',
      data: {
        keptFishArray: this.keptFish,
      },
    });
  }
}
