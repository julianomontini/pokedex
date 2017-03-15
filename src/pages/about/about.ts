import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {DataManagerService} from "../../app/data-saver/data-manager-service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private dataManager: DataManagerService) {

  }

  onSave(){

    let object = {
      nome: "teste",
      idade: 11
    };

    this.dataManager.saveData("primeiroObjeto", object);
  }

  onRetrieve(){

    this.dataManager.retrieveData("primeiroObjeto").then( (object : any) => {

      console.log(object);

    });

  }

}
