import { Component, OnInit } from '@angular/core';
import { Hero } from '../../Class/hero';
import { HeroService } from '../../Services/hero.service';
import { MessageService} from '../../Services/message.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.add('Dashboard open');
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroesw().subscribe(heroes => this.heroes = heroes.slice(2,4));
    //this.heroService.showSpecialHero().subscribe(heroes => this.heroes = heroes);

  }

}
