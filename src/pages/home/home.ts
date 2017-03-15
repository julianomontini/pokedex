import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PokemonService } from '../../app/pokemon/pokemon-service';
import { Pokemon } from "../../app/pokemon/pokemon-class";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private pokemonList: Pokemon[] = [];

  constructor(public navCtrl: NavController, private pokeServ: PokemonService) {

  }

  next(){
    this.pokeServ.getPokemonListNext().subscribe(data => {console.log(data)});
  }

  previous(){
    this.pokeServ.getPokemonListPrevious().subscribe(data => {console.log(data)});
  }

}
