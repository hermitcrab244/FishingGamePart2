import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamedataService {
  constructor() {}

  private gameDataSubject = new BehaviorSubject<any>(null);

  setGameData(data: any) {
    this.gameDataSubject.next(data);
  }

  retrieveGameData() {
    return this.gameDataSubject.asObservable();
  }
}
