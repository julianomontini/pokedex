import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PokemonOverviewService } from '../../app/pokemon/pokemon-overview-service';
import { PokemonOverview } from "../../app/pokemon/pokemon-overview-interface";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy{

  private pokemonList: PokemonOverview[] = [];
  private subscription: Subscription;

  constructor(public navCtrl: NavController, private pokeServ: PokemonOverviewService) {

  }

  next(){
    this.pokeServ.getPokemonListNext();
  }

  previous(){
    this.pokeServ.getPokemonListPrevious();
  }

  ngOnInit(){
    this.subscription = this.pokeServ.pokemonSubscription.subscribe( (data : PokemonOverview[]) =>{
      this.pokemonList = data;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
