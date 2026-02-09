import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './types';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private apiUrl = '/api/heroes';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) {}

  public getHeroes() {
    return this.http.get<Hero[]>(this.apiUrl).pipe(
      tap((_) => this.log('Heroes list loaded')),
      catchError(this.handleError<Hero[]>('getHeroes', [])),
    );
  }

  public getHero(id: number) {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`).pipe(
      tap((_) => this.log(`Heroes loaded ID: ${id}`)),
      catchError(this.handleError<Hero>('getHero')),
    );
  }

  public updateHero(hero: Hero) {
    return this.http.put(this.apiUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`Updated hero ID: ${hero.id}`)),
      catchError(this.handleError<any>('updateHero')),
    );
  }

  public addHero(name: string) {
    return this.http.post<Hero>(this.apiUrl, { name }, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Created hero ID: ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero')),
    );
  }

  public deleteHero(id: number) {
    return this.http
      .delete<Hero>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(
        tap(() => this.log(`Deleted hero ID: ${id}`)),
        catchError(this.handleError<Hero>('deleteHero')),
      );
  }

  public searchHeroes(value: string) {
    if (!value.trim()) return of([]);

    return this.http.get<Hero[]>(`${this.apiUrl}?name=${value}`).pipe(
      tap((result) =>
        this.log(
          result.length
            ? `Found heroes matching ${value}`
            : `No heroes found matching ${value}`,
        ),
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', [])),
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: { message: string }): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`Heroes service: ${message}`);
  }
}
