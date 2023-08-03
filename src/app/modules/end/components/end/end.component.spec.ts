import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EndComponent } from './end.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { GamedataService } from 'src/app/core/services/gameservice/gamedata.service';
import { BackendService } from 'src/app/core/services/backendService/backend.service';
import { of } from 'rxjs';

describe('EndComponent', () => {
  let component: EndComponent;
  let fixture: ComponentFixture<EndComponent>;
  let mockBackendService: Partial<BackendService>;

  beforeEach(async () => {
    mockBackendService = {
      saveResults: () => of({}),
    };

    await TestBed.configureTestingModule({
      declarations: [EndComponent],
      imports: [MaterialModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        GamedataService,
        { provide: BackendService, useValue: mockBackendService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties', () => {
    expect(component.finalScore).toBe(0);
    expect(component.totalCasts).toBe(0);
    expect(component.playerName).toBe('');
    expect(component.keptFish).toEqual([]);
    expect(component.KingGeorge).toBe(0);
    expect(component.LargeMullet).toBe(0);
    expect(component.LostBait).toBe(0);
    expect(component.SeaweedMonster).toBe(0);
    expect(component.SmallMulloway).toBe(0);
    expect(component.Snapper).toBe(0);
  });

  it('should display correct fish counts', () => {
    component.keptFish = [
      'King George Whiting',
      'King George Whiting',
      'Lost Bait',
      'Seaweed Monster',
      'Large Mullet',
      'Snapper',
      'Seaweed Monster',
      'King George Whiting',
    ];

    component.finalFishCounts();

    expect(component.KingGeorge).toBe(3);
    expect(component.LargeMullet).toBe(1);
    expect(component.LostBait).toBe(1);
    expect(component.SeaweedMonster).toBe(2);
    expect(component.SmallMulloway).toBe(0);
    expect(component.Snapper).toBe(1);
  });
});
