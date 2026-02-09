import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { HEROES } from './data';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  public getHeroes() {
    const heroes = of(HEROES);

    this.messageService.add('Heroes list loaded');

    return heroes;
  }

  public getHero(id: number) {
    const hero = HEROES.find((hero) => hero.id === id);

    this.messageService.add(`Hero loaded ID: ${id}`);

    return of(hero);
  }
}
