import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Route[] = [
  {
    path: 'heroes',
    component: HeroesComponent,
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
