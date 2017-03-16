import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Pokemon } from './pokemon-class';
import { DataManagerService } from '../data-saver/data-manager-service';

@Injectable()
export class PokemonService{

    private previousUrl: string;
    private nextUrl: string = "http://pokeapi.co/api/v2/pokemon/?limit=";
    private isFirstCall: boolean = true;
    private pokemonList: Pokemon[] = [];
    public pokemonSubscription: EventEmitter<Pokemon[]> = new EventEmitter();

    constructor(private http: Http, private dataManager: DataManagerService){

    }

    private updateSubscription(data : Pokemon[]){
        this.pokemonSubscription.emit(data);
    }

    public getPokemonListNext(limit?:number){

        if(this.isFirstCall){
            this.nextUrl += limit ? limit : "20";
            this.isFirstCall = false;
        }

        if(this.nextUrl == null)
            this.updateSubscription([]);

        this.getCacheData(this.nextUrl).then( (data : Observable<Pokemon[]>) => {
            data.subscribe(pokemons => {
                this.updateSubscription(pokemons);
            })
        });

    }

    public getPokemonListPrevious(limit?:number){

        if(this.previousUrl == null)
            this.updateSubscription([]);

        this.getCacheData(this.previousUrl).then( (data : Observable<Pokemon[]>) => {
            data.subscribe(pokemons => {
                this.updateSubscription(pokemons);
            })
        });

    }

    public hasNextPage() : boolean{
        return (this.nextUrl != null);
    }

    public hasPreviousPage() : boolean{
        return (this.previousUrl != null);
    }

    private convertResponseToArray(res):Pokemon[]{

            this.nextUrl = res.next;
            this.previousUrl = res.previous;

            if(!res.results){
                return [];
            }

            let arrayPokemons: Pokemon[] = [];

            for(let pokemon of res.results){
                arrayPokemons.push(new Pokemon(pokemon.name, pokemon.url));
            }

            return arrayPokemons;
    }

    private getCacheData(key: string) : Promise<Observable<Pokemon[]>>{

        return this.dataManager.retrieveData(key).then(data => {

            if(data != null){
                Observable.of(this.convertResponseToArray(data));
            }

             return this.http.get(key).map((res: Response) => {
                this.dataManager.saveData(this.nextUrl, res.json());
                return this.convertResponseToArray(res.json());
            });

        });

    }
}