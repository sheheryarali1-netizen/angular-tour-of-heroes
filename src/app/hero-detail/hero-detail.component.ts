import { Component, OnInit } from '@angular/core';
import { Hero } from '../types';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  public hero?: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;

    const heroId = Number(routeParams.get('id'));

    this.getHero(heroId);
  }

  private getHero(id: number) {
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  public goBack() {
    this.location.back();
  }

  public save() {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
