import { Component, OnInit } from '@angular/core';
import { HEROES } from '../data';
import { Hero } from '../types';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];

  public selectedHero?: Hero;

  constructor(private heroService: HeroService) {}

  public onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  public getHeroes() {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  ngOnInit() {
    this.getHeroes();
  }
}
