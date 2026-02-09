import { Component, OnInit } from '@angular/core';
import { HEROES } from '../data';
import { Hero } from '../types';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  public heroes = HEROES;

  public selectedHero?: Hero;

  constructor() {}

  ngOnInit() {}

  public onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
}
