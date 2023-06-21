import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  fishArray: any[] = [];
  keep = 'keep';
  release = 'release';
  playerChoice = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.retrieveCSVData();
  }

  playCast() {
    const randomNumber = Math.floor(Math.random() * 6);
    console.log(randomNumber);
    console.log(this.fishArray[randomNumber].name);
    console.log(this.fishArray[randomNumber].img);
  }

  keepRelease(choice: string) {
    this.playerChoice = choice;
    console.log(this.playerChoice);
  }

  retrieveCSVData() {
    this.http
      .get('./assets/Fishing.csv', { responseType: 'text' })
      .subscribe((data) => {
        const rows = data.split('\n');
        const headers = rows[0].split(',');

        this.fishArray = rows.slice(1).map((row) => {
          const values = row.split(',');
          const obj: any = {};

          for (let i = 0; i < headers.length; i++) {
            obj[headers[i]] = values[i];
          }

          return {
            name: obj['Name'],
            keeper: obj['Keeper'] === 'Y' ? 'yes' : 'no',
            fish: obj['Fish'] === 'Y' ? 'yes' : 'no',
            kept: parseInt(obj['Kept'], 10),
            released: parseInt(obj['Released'], 10),
            img: `../../../../../../assets/images/${values[5]}`,
          };
        });

        console.log(this.fishArray);
      });
  }
}
