import { Injectable, EventEmitter } from "@angular/core";
import { PokemonDetail } from "./pokemon-detail-interface";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class PokemonDetailService {

  pokemonDetail: PokemonDetail;
  emitUpdate: EventEmitter<PokemonDetail> = new EventEmitter<PokemonDetail>();

  constructor(private http: Http) {

  }

  public getPokemonDetail(url: string) {

    let subscription: Subscription;

    subscription = this.http.get(url)
      .map(data => {
        let pokemonDetail: PokemonDetail = data.json();
        return pokemonDetail;
      })
      .subscribe((pokemonDetail:PokemonDetail) => {
        this.emitUpdate.emit(pokemonDetail)
        subscription.unsubscribe();
      });

  }

}