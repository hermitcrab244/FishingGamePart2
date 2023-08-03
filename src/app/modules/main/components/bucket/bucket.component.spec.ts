import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BucketComponent } from './bucket.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

describe('BucketComponent', () => {
  let component: BucketComponent;
  let fixture: ComponentFixture<BucketComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BucketComponent],
      imports: [MaterialModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { keptFishArray: [] } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.KingGeorge).toBe(0);
    expect(component.LargeMullet).toBe(0);
    expect(component.LostBait).toBe(0);
    expect(component.SeaweedMonster).toBe(0);
    expect(component.SmallMulloway).toBe(0);
    expect(component.Snapper).toBe(0);
  });

  it('should update data correctly', () => {
    const mockData = {
      keptFishArray: [
        'King George Whiting',
        'King George Whiting',
        'Lost Bait',
        'Seaweed Monster',
        'Large Mullet',
        'Snapper',
        'Seaweed Monster',
        'King George Whiting',
      ],
    };

    component.data = mockData;

    component.updateFishCounts();

    expect(component.KingGeorge).toBe(3);
    expect(component.LargeMullet).toBe(1);
    expect(component.LostBait).toBe(1);
    expect(component.SeaweedMonster).toBe(2);
    expect(component.SmallMulloway).toBe(0);
    expect(component.Snapper).toBe(1);
  });
});
