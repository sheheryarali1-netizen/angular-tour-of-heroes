import { Component, OnInit } from '@angular/core';
import { Hero } from '../types';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];

  public selectedHero?: Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
  ) {}

  public onSelect(hero: Hero) {
    this.selectedHero = hero;

    this.messageService.add(`Hero selected with ID: ${hero.id}`);
  }

  public getHeroes() {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  public addHero(name: string) {
    if (!name.trim()) return;

    this.heroService.addHero(name).subscribe((hero) => this.heroes.push(hero));
  }

  public deleteHero(id: number) {
    this.heroes = this.heroes.filter((hero) => hero.id !== id);

    this.heroService.deleteHero(id).subscribe();
  }

  ngOnInit() {
    this.getHeroes();
  }
}
