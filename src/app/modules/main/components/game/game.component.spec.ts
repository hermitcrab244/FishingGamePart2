import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { FishDataService } from 'src/app/core/services/fishService/fish-data.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let fishDataService: FishDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [HttpClientTestingModule, MaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fishDataService = TestBed.inject(FishDataService);
    spyOn(fishDataService, 'getFishArray').and.returnValue(
      fishDataService.fishData
    );

    fixture.detectChanges();
  });

  //Component should be created on screen
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Tests if the number generator is random
  it('should generate random number', () => {
    const generatedNumbers: number[] = [];
    const numCasts = 100;

    for (let i = 0; i < numCasts; i++) {
      component.playCast();
      generatedNumbers.push(component.randomNumber);
    }
    const validNumbers = generatedNumbers.every((num) => num >= 0 && num <= 5);
    expect(validNumbers).toBeTruthy();
  });

  //Message telling user whatfish they caught show appear correctly on the UI
  it('should set fish message correctly', () => {
    spyOn(component, 'getRandomNumber').and.returnValue(0);

    component.playCast();

    expect(component.fishMsg).toEqual('You caught a King George Whiting!');
  });

  //The unique lost bait message should appear only when the user gets a lost bait as the result
  it('should set correct lost bait message', () => {
    spyOn(component, 'getRandomNumber').and.returnValue(1);

    component.playCast();

    expect(component.fishMsg).toEqual('You lost your bait!');
  });

  //After the user has clicked the cast button the keep or release buttons should appear on the screen
  it('should show buttons after cast', () => {
    component.playCast();
    fixture.detectChanges();

    expect(component.showChoice).toBeTruthy();
    expect(component.castDisabled).toBeTruthy();
  });

  //The correct data should be set is the user selects keep
  it('should set corret game data for kept', () => {
    spyOn(component, 'getRandomNumber').and.returnValue(3);

    component.playCast();
    component.keepRelease('kept');

    expect(component.playerChoice).toEqual('kept');
    expect(component.fish).toEqual('Snapper');
    expect(component.score).toBe(30);
    expect(component.choiceMsg).toEqual('You scored: 30');
    expect(component.selectDisabled).toBeTruthy();
  });

  //The correct data should be set if the user selects release
  it('should set corret game data for released', () => {
    spyOn(component, 'getRandomNumber').and.returnValue(3);

    component.playCast();
    component.keepRelease('released');

    expect(component.playerChoice).toEqual('released');
    expect(component.fish).toEqual('Snapper');
    expect(component.score).toBe(40);
    expect(component.choiceMsg).toEqual('You scored: 40');
    expect(component.selectDisabled).toBeTruthy();
  });

  //After the round and the user has made their select the UI should reset after a set duration of time
  it('should reset component after set duration', () => {
    spyOn(component, 'getRandomNumber').and.returnValue(5);
    component.playCast();
    fixture.detectChanges();

    expect(component.fishMsg).toEqual('You caught a Seaweed Monster!');
    expect(component.castDisabled).toBeTruthy();
    expect(component.showChoice).toBeTruthy();

    component.keepRelease('kept');
    fixture.detectChanges();

    expect(component.playerChoice).toEqual('kept');
    expect(component.fish).toEqual('Seaweed Monster');
    expect(component.score).toBe(5);
    expect(component.choiceMsg).toEqual('You scored: 5');
    expect(component.selectDisabled).toBeTruthy();

    setTimeout(() => {
      expect(component.fishMsg).toEqual('Click the rod to cast again!');
      expect(component.fishImg).toEqual('Fishing-Rod.png');
      expect(component.castDisabled).toBeFalsy();
      expect(component.showChoice).toBeFalsy();
      expect(component.choiceMsg).toEqual(
        'Would you like to release or keep the fish?'
      );
      expect(component.selectDisabled).toBeFalsy();
    }, 1750);
  });
});
