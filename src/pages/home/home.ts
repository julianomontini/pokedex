import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PokemonService } from '../../app/pokemon/pokemon-service';
import { Pokemon } from "../../app/pokemon/pokemon-class";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy{

  private pokemonList: Pokemon[] = [];
  private subscription: Subscription;

  constructor(public navCtrl: NavController, private pokeServ: PokemonService) {

  }

  next(){
    this.pokeServ.getPokemonListNext();
  }

  previous(){
    this.pokeServ.getPokemonListPrevious();
  }

  ngOnInit(){
    this.subscription = this.pokeServ.pokemonSubscription.subscribe( (data : Pokemon[]) =>{
      this.pokemonList = data;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
