import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss'],
})
export class BucketComponent implements OnInit {
  constructor(
    public BucketDialogRef: MatDialogRef<BucketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  KingGeorge = 0;
  LargeMullet = 0;
  LostBait = 0;
  SeaweedMonster = 0;
  SmallMulloway = 0;
  Snapper = 0;

  ngOnInit() {
    this.updateFishCounts();
  }

  updateFishCounts() {
    this.data.keptFishArray.forEach((fish: string) => {
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
