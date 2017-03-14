import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import{ Pokemon } from './pokemon-class';

@Injectable()
export class PokemonService{

    private previousUrl: string;
    private nextUrl: string = "http://pokeapi.co/api/v2/pokemon/";
    private isFirstCall: boolean = true;

    constructor(private http: Http){

    }

    public getPokemonListNext(limit?:number): Observable<Pokemon[]>{

        if(this.isFirstCall){
            this.nextUrl += limit ? "?"+limit : "?20";
            this.isFirstCall = false;
        }

        if(this.nextUrl == null)
            return Observable.of([]);

        return this.http.get(this.nextUrl).map((res: Response) => {

            return this.convertResponseToArray(res);

        });

    }

    public getPokemonListPrevious(limit?:number): Observable<Pokemon[]>{

        if(this.previousUrl == null)
            return Observable.of([]);

        return this.http.get(this.previousUrl).map((res: Response) => {

            return this.convertResponseToArray(res);

        });

    }

    public hasNextPage() : boolean{
        return (this.nextUrl != null);
    }

    public hasPreviousPage() : boolean{
        return (this.previousUrl != null);
    }

    private convertResponseToArray(res: Response):Pokemon[]{
        let data = res.json();

            this.nextUrl = data.next;
            this.previousUrl = data.previous;

            if(!data.results){
                return [];
            }

            let arrayPokemons: Pokemon[] = [];

            for(let pokemon of data.results){
                arrayPokemons.push(new Pokemon(pokemon.name, pokemon.url));
            }

            return arrayPokemons;
    }
}