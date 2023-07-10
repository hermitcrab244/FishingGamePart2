import { Component, OnInit } from '@angular/core';
import { GamedataService } from 'src/app/core/services/gameservice/gamedata.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss'],
})
export class EndComponent implements OnInit {
  finalScore = 0;
  totalCasts = 0;
  playerName = '';
  keptFish: string[] = [];

  KingGeorge = 0;
  LargeMullet = 0;
  LostBait = 0;
  SeaweedMonster = 0;
  SmallMulloway = 0;
  Snapper = 0;

  constructor(private gameService: GamedataService) {}

  ngOnInit() {
    this.gameService.retrieveGameData().subscribe((data) => {
      if (data) {
        this.playerName = data.playerName;
        this.finalScore = data.totalScore;
        this.totalCasts = data.totalCasts;
        this.keptFish = data.keptFish;
      }
    });

    this.finalFishCounts();
  }

  finalFishCounts() {
    this.keptFish.forEach((fish: string) => {
      switch (fish) {
        case 'King George Whiting':
          this.KingGeorge++;
          break;
        case 'Large Mullet':
          this.LargeMullet++;
          break;
        case 'Lost Bait':
          this.LostBait++;
          break;
        case 'Seaweed Monster':
          this.SeaweedMonster++;
          break;
        case 'Small Mulloway':
          this.SmallMulloway++;
          break;
        case 'Snapper':
          this.Snapper++;
          break;
        default:
          break;
      }
    });
  }
}
