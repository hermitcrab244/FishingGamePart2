import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  fishArray: any[] = [];
  randomNumber = 0;
  keep = 'kept';
  release = 'released';
  playerChoice = '';
  fishImg = '../../../../../assets/images/Fishing-Rod.png';
  fishMsg = 'Click the rod to cast!';
  choiceMsg = 'Would you like to release or keep the fish?';
  showChoice = false;
  castDisabled: boolean = false;
  selectDisabled: boolean = false;
  score = 0;
  castCount = 0;
  fish = '';

  constructor(private http: HttpClient) {}

  //CSV reader method is called upon page load
  ngOnInit() {
    this.retrieveCSVData();
  }

  //Creates output event emitter that outputs results from each round
  @Output() roundResults = new EventEmitter<{
    score: number;
    fish: string;
    choice: string;
  }>();

  //Method that runs bulk of the game once cast button has been clicked
  playCast() {
    this.randomNumber = Math.floor(Math.random() * 6); //Generates random number between 0-6
    this.fishImg = this.fishArray[this.randomNumber].img; //Changes picture on page to caught fish
    if (this.fishArray[this.randomNumber].name === 'Lost Bait') {
      //Displays message with name of caught fish
      this.fishMsg = 'You lost your bait!';
    } else {
      this.fishMsg = `You caught a ${this.fishArray[this.randomNumber].name}!`;
    }
    this.showChoice = true; //Displays the buttons for user keep or release choice
    this.castDisabled = true;
  }

  //Method gets players choice and displays score once player have selected option
  keepRelease(choice: string) {
    this.playerChoice = choice;
    this.score = this.fishArray[this.randomNumber][this.playerChoice];
    this.fish = this.fishArray[this.randomNumber].name;
    this.choiceMsg = `You scored ${this.score}`;
    this.selectDisabled = true;

    setTimeout(() => {
      //Resets page so user can play again
      this.fishMsg = 'Click the rod to cast again!';
      this.fishImg = '../../../../../assets/images/Fishing-Rod.png';
      this.castDisabled = false;
      this.showChoice = false;
      this.choiceMsg = 'Would you like to release or keep the fish?';
      this.selectDisabled = false;

      this.sendResults(this.score, this.fish, this.playerChoice);
    }, 1750);
  }

  sendResults(score: number, fish: string, choice: string) {
    this.roundResults.emit({ score: score, fish: fish, choice: choice });
  }

  //Method used to read in csv file and convert contents to an array of fish that can be used within the game
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
      });
  }
}
