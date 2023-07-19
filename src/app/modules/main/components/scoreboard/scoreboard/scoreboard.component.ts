import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BucketComponent } from '../../bucket/bucket.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GamedataService } from 'src/app/core/services/gameservice/gamedata.service';

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

  playerName = '';
  totalScore: number = 0;
  totalCasts: number = 0;
  lastCatch = '';
  keptFish: string[] = [];

  constructor(public dialog: MatDialog, private gameService: GamedataService) {}

  ngOnInit(): void {
    this.totalCasts = 0;
    this.lastCatch = 'No catches yet';
    this.playerName = this.gameService.playerName;
  }

  ngOnChanges() {
    this.totalCasts++;
    this.totalScore = this.totalScore + (this.score || 0);
    this.lastCatch = this.fish;

    if (this.choice === 'kept') {
      this.keptFish.push(this.fish);
    }

    this.gameService.setGameData({
      playerName: this.playerName,
      totalScore: this.totalScore,
      totalCasts: this.totalCasts,
      keptFish: this.keptFish,
    });
  }

  bucketClick() {
    this.BucketDialogRef = this.dialog.open(BucketComponent, {
      width: '40%',
      data: {
        keptFishArray: this.keptFish,
      },
    });
  }
}
