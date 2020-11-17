import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { HeroesComponent } from './Components/heroes/heroes.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import {HeroDetailComponent} from './Components/hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard' , component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent }
         //path : строка, которая соответствует URL в адресной строке браузера.
];       //component : компонент, который маршрутизатор должен создать при переходе к этому маршруту.
         //Это говорит маршрутизатору сопоставить этот URL с path: 'heroes' и отобразить HeroesComponent когда URL-это что-то вроде localhost:4200/heroes.

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }