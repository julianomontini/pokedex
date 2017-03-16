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

    public getPokemonListNext(limit?:number): Promise<any>{

        if(this.isFirstCall){
            this.nextUrl += limit ? limit : "20";
            this.isFirstCall = false;
        }

        if(this.nextUrl == null)
            return Promise.resolve([]);

        return this.getCacheData(this.nextUrl);

    }

    public getPokemonListPrevious(limit?:number): Promise<any>{

        if(this.previousUrl == null)
            return Promise.resolve([]);

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

    private getCacheData(key: string) : Promise<any>{

        return this.dataManager.retrieveData(key).then(data => {

            if(data != null){
                this.dataManager.saveData(this.nextUrl, data);
                let dataToJson = JSON.parse(data['_body']);
                return Observable.of(this.convertResponseToArray(dataToJson));

            }

             return this.http.get(key).map((res: Response) => {
                this.dataManager.saveData(this.nextUrl, res);
                let resToJson = res.json();
                return this.convertResponseToArray(resToJson);

            });

        }).then();

    }
}