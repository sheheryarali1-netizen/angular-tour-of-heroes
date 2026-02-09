import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Hero } from '../types';
import { HeroService } from '../hero.service';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  public heroes$: Observable<Hero[]> = of([]);
  private searchTerm = new Subject<string>();

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this.heroService.searchHeroes(value)),
    );
  }

  public searchHero(value: string) {
    this.searchTerm.next(value);
  }
}
