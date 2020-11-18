import { Injectable } from '@angular/core';

import { from, Observable, of } from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';
import { Hero } from '../Class/hero';
import { HEROES } from '../Class/mock-heroes';
import { MessageService } from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HeroService {

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes';
  private handleError<T>(operation = 'operation',result?:T){
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
  };
}


  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }

  specialHeroes:Hero[] = [];

  heroes$: Observable<Hero[]>;

  getHeroesw(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');

    return this.http.get<Hero[]>(this.heroesUrl);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  updateHero(hero:Hero):Observable<any>{
    console.log(this.heroesUrl);
    console.log(hero);
    
    return this.http.put(this.heroesUrl, hero)
    
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero)
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<Hero>(url)

  }



  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
  }


  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);

    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url);

   // return of(HEROES.find(hero => hero.id === id));
  }

  getSpecialHero(id: number):void{

    
    this.specialHeroes.push(HEROES.find(hero => hero.id === id ));
    this.specialHeroes.find(hero => hero.id === id? hero.isFavorite = true : false)
    console.log(this.specialHeroes);
    
    

  }

  deleteSpecialHero(id: number):void{
   // this.specialHeroes.splice(this.specialHeroes.indexOf(this.specialHeroes.find(hero => hero.id === id)), 1);

   this.specialHeroes= this.specialHeroes.filter(hero => hero.id !== id )
   

    
  }

  showSpecialHero():Observable<Hero[]>
  {
    return of(this.specialHeroes);    
  }
}