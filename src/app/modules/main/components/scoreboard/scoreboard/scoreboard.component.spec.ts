import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ScoreboardComponent } from './scoreboard.component';
import { BucketComponent } from '../../bucket/bucket.component';
import { GamedataService } from 'src/app/core/services/gameservice/gamedata.service';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { of } from 'rxjs';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;
  let mockDialogRef: Partial<MatDialogRef<BucketComponent>>;
  let mockGameData: GamedataService;

  beforeEach(async () => {
    mockDialogRef = {
      afterClosed() {
        return of(true);
      },
    };

    mockGameData = jasmine.createSpyObj('GamedataService', ['setGameData']);
    mockGameData.playerName = 'User Test';

    await TestBed.configureTestingModule({
      declarations: [ScoreboardComponent],
      imports: [MatDialogModule, MaterialModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { keptFishArray: [] } },
        { provide: GamedataService, useValue: mockGameData },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Tests is componet is created on the page
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //When scoreboard component is initialized it should have the correct data and values
  it('should initialize data correctly', () => {
    expect(component.playerName).toEqual('User Test');
    expect(component.totalScore).toBe(0);
    expect(component.totalCasts).toBe(0);
    expect(component.lastCatch).toEqual('No catches yet');
  });

  //The scorebaord should update correctly when data is recieved
  it('should update data correctly', () => {
    component.score = 30;
    component.fish = 'Snapper';
    component.choice = 'kept';

    component.ngOnChanges();

    expect(component.totalCasts).toBe(1);
    expect(component.totalScore).toBe(30);
    expect(component.lastCatch).toBe('Snapper');
    expect(component.keptFish).toEqual(['Snapper']);
    expect(mockGameData.setGameData).toHaveBeenCalledWith({
      playerName: 'User Test',
      totalScore: 30,
      totalCasts: 1,
      keptFish: ['Snapper'],
    });

    component.score = 70;
    component.fish = 'King George Whiting';
    component.choice = 'released';

    component.ngOnChanges();

    expect(component.totalCasts).toBe(2);
    expect(component.totalScore).toBe(100);
    expect(component.lastCatch).toBe('King George Whiting');
    expect(component.keptFish).toEqual(['Snapper']);
    expect(mockGameData.setGameData).toHaveBeenCalledWith({
      playerName: 'User Test',
      totalScore: 100,
      totalCasts: 2,
      keptFish: ['Snapper'],
    });

    component.score = 5;
    component.fish = 'Seaweed Monster';
    component.choice = 'kept';

    component.ngOnChanges();

    expect(component.totalCasts).toBe(3);
    expect(component.totalScore).toBe(105);
    expect(component.lastCatch).toBe('Seaweed Monster');
    expect(component.keptFish).toEqual(['Snapper', 'Seaweed Monster']);
    expect(mockGameData.setGameData).toHaveBeenCalledWith({
      playerName: 'User Test',
      totalScore: 105,
      totalCasts: 3,
      keptFish: ['Snapper', 'Seaweed Monster'],
    });
  });

  //Bucket component should be opened correctly on buton click
  it('should open bucket when clicked', () => {
    spyOn(component.dialog, 'open').and.callThrough();

    component.bucketClick();

    expect(component.dialog.open).toHaveBeenCalledOnceWith(BucketComponent, {
      width: '40%',
      data: { keptFishArray: [] },
    });
  });
});
