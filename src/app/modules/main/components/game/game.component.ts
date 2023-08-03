import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FishDataService } from 'src/app/core/services/fishService/fish-data.service';

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
  imgURL = '../../../../../assets/images/';

  constructor(
    private router: Router,
    private fishDataService: FishDataService
  ) {}

  //CSV reader method is called upon page load
  ngOnInit() {
    this.fishArray = this.fishDataService.getFishArray();
    console.log(this.fishArray);
  }

  //Creates output event emitter that outputs results from each round
  @Output() roundResults = new EventEmitter<{
    score: number;
    fish: string;
    choice: string;
  }>();

  //Method that runs bulk of the game once cast button has been clicked
  playCast() {
    this.randomNumber = this.getRandomNumber(); //Retieves number that is generated in service
    this.fishImg = this.imgURL + this.fishArray[this.randomNumber].img; //Changes picture on page to caught fish
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
    this.choiceMsg = `You scored: ${this.score}`;
    this.selectDisabled = true;

    setTimeout(() => {
      //Resets page so user can play again
      this.fishMsg = 'Click the rod to cast again!';
      this.fishImg = this.imgURL + 'Fishing-Rod.png';
      this.castDisabled = false;
      this.showChoice = false;
      this.choiceMsg = 'Would you like to release or keep the fish?';
      this.selectDisabled = false;

      //Calls method to send results at the end of the round
      this.sendResults(this.score, this.fish, this.playerChoice);
    }, 1750);
  }

  //Generates random number between 0-5
  getRandomNumber(): number {
    return Math.floor(Math.random() * 6);
  }

  //Method that emits the results of the round to the scoreboard component
  sendResults(score: number, fish: string, choice: string) {
    this.roundResults.emit({ score: score, fish: fish, choice: choice });
  }

  // Method used to navigate to the end game page once the user clicks the button
  close() {
    this.router.navigate(['/end-page']);
  }
}
