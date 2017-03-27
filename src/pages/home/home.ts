import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

import { AngularFire, AuthMethods, AuthProviders ,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rpi;
   private Rooms:FirebaseObjectObservable<any>;
  //  private mail:FirebaseObjectObservable<any[]>;
  private uid:String="SMbf7EjRFZRCIxzssTDUT4UnR83";
  constructor(public navCtrl: NavController,private af:AngularFire,public navParams:NavParams) {
this.initializeItems();
// this.uid= this.navParams.get('uid');
this.Rooms=af.database.object('/users/'+this.uid+'/status');
console.log("uid home: "+this.uid)
console.log(JSON.stringify(this.Rooms));
// console.log(this.Rooms)
// this.Rooms=af.database.object('/Rooms');
// this.Rooms.push({"a":"b"}).then((room) => { console.log(room.key); });
// this.mail=af.database.object('/name').set({ name: 'Test' });;
// .set({ name: 'Test' });
// this.mail.push({});
// this.mail.push({name:'new item'}).then((room) => { console.log(room.key); });;
// af.database.object().put()
  }

   initializeItems() {
    this.rpi = [
      'Aamsterdam',
      'Bogota',
      'Buenos Aires',
      'Cairo',
      'Dhaka',
      'Edinburgh',
      'Geneva',
'Genoa'
    ];
}
  logout() { 
    this.af.auth.logout(); 
    console.log("Log out");
  }

 getItems(ev) {
    // Reset rpi back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the rpi
    if (val && val.trim() != '') {
      this.rpi = this.rpi.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
}

}
