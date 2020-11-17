import { Component, OnInit } from '@angular/core';
import { Hero } from '../../Class/hero';
import { HeroService } from '../../Services/hero.service';
import {MessageService} from '../../Services/message.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  constructor(
    private heroService: HeroService, 
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location 
  ){}
  

  count: number = 0;
  heroes:Hero[];
  selectedHero: Hero;


  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroesw()
    .subscribe(heroes => this.heroes = heroes);
  }

  clickOperation():void{
    this.count = ++this.count;
  }

  add(name:string):void
  {
    name = name.trim();
    if(!name){return;}

    this.heroService.addHero({name} as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero:Hero):void
  {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
    this.heroService.deleteSpecialHero(hero.id);
  } 
}