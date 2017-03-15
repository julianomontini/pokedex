import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DataManagerService } from "../../app/data-saver/data-manager-service";
import { ObservableTest } from "../../app/data-saver/observable-test";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private dataManager: DataManagerService) {

  }

}
