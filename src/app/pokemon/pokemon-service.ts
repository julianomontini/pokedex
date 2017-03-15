import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Pokemon } from './pokemon-class';
import { DataManagerService } from '../data-saver/data-manager-service';

@Injectable()
export class PokemonService{

    private previousUrl: string;
    private nextUrl: string = "http://pokeapi.co/api/v2/pokemon/?limit=";
    private isFirstCall: boolean = true;

    constructor(private http: Http, private dataManager: DataManagerService){

    }

    public getPokemonListNext(limit?:number): Observable<Pokemon[]>{

        if(this.isFirstCall){
            this.nextUrl += limit ? limit : "20";
            this.isFirstCall = false;
        }

        if(this.nextUrl == null)
            return Observable.of([]);

        return this.getCacheData(this.nextUrl).map((a) => {
            return a;
        });

    }

    public getPokemonListPrevious(limit?:number): Observable<Pokemon[]>{

        if(this.previousUrl == null)
            return Observable.of([]);

        return this.getCacheData(this.previousUrl);

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

    private getCacheData(key: string) : Observable<any>{

        return this.dataManager.retrieveData(key).map(data => {
            console.log(data);
            if(data != null){
                // this.dataManager.saveData(this.nextUrl, data);
                let dataToJson = data;
                return this.convertResponseToArray(dataToJson);
            }

             this.http.get(key).map((res: Response) => {
                 console.log(res);
                this.dataManager.saveData(this.nextUrl, res.json());
                let resToJson = res.json();
                return this.convertResponseToArray(resToJson);

            });
        });
    }
}