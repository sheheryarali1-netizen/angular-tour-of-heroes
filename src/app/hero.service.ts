import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { HEROES } from './data';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor() {}

  public getHeroes() {
    const heroes = of(HEROES);
    return heroes;
  }
}
