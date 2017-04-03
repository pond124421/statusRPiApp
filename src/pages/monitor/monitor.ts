import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire ,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
/*
  Generated class for the Monitor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-monitor',
  templateUrl: 'monitor.html'
})
export class MonitorPage {

  private ref: FirebaseObjectObservable<any>;  
  private path: string;

  private status: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    this.path = this.navParams.get('path');
    console.log("path : " + this.path);
    this.ref = af.database.object(this.path);
          this.ref.subscribe(item => {
        // console.log(item);
            this.status = item;
        // this.rpi=Object.keys(item)
            console.log(JSON.stringify(item));
            // console.log(item
        // return item;
      });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MonitorPage');
  }

}
