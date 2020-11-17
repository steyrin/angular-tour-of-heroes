import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../../Class/hero';
import { HeroService }  from '../../Services/hero.service';



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  oldName: string;
  thisHeroFav: boolean;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  //subscribe basha dushmeyende bura baxmaq lazimdi
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
    this.heroService.getHero(id).subscribe(hero => this.oldName = hero.name);

  }

  goBack(): void {
    this.location.back();
  }
 
  onChangee(values:any): void {

   if (values.currentTarget.checked === true) {
     
   this.heroService.getSpecialHero(this.hero.id);
    console.log(this.thisHeroFav);
   
   
   } else {
    this.heroService.deleteSpecialHero(this.hero.id);
   }
   
  }


  save():void{

    this.heroService.updateHero(this.hero).subscribe();
    
    console.log(this.oldName + ' edited to '+ this.hero.name);
    
  }


  @Input() userName:string;
  @Output() userNameChange = new EventEmitter<string>();
  onNameChange(model: string){
      this.userName = model;
      this.userNameChange.emit(model);
  }

  
 
}