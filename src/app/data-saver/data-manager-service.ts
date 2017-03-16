import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataManagerService {

  constructor(private storage: Storage){

  }

  saveData(key: string, object: any){

    this.storage.ready().then(() => {

      this.storage.set(key, object);

    });

  }

  retrieveData(key: string) : Promise<any>{
    return this.storage.get(key);
  }

}
