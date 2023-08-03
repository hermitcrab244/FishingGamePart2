import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FishDataService {
  constructor(private http: HttpClient) {}

  //Array that contains all fish data
  fishData = [
    {
      name: 'King George Whiting',
      keeper: 'Y',
      fish: 'Y',
      kept: 50,
      released: 70,
      img: 'King-George.png',
    },
    {
      name: 'Lost Bait',
      keeper: 'N',
      fish: 'N',
      kept: -10,
      released: 0,
      img: 'Lost-Bait.png',
    },
    {
      name: 'Small Mulloway',
      keeper: 'N',
      fish: 'Y',
      kept: -10,
      released: 10,
      img: 'Small-Mulloway.png',
    },
    {
      name: 'Snapper',
      keeper: 'Y',
      fish: 'Y',
      kept: 30,
      released: 40,
      img: 'Snapper.png',
    },
    {
      name: 'Large Mullet',
      keeper: 'Y',
      fish: 'Y',
      kept: 20,
      released: 20,
      img: 'Large-Mullet.png',
    },
    {
      name: 'Seaweed Monster',
      keeper: 'Y',
      fish: 'N',
      kept: 5,
      released: -5,
      img: 'Seaweed.png',
    },
  ];

  getFishArray(): any[] {
    return this.fishData;
  }
}
