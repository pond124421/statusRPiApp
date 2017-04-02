import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MonitorPage } from '../monitor/monitor'
import { AngularFire, AuthMethods, AuthProviders ,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rpi;
  obRpi;
  aboutPage = AboutPage;
   private Rooms:FirebaseObjectObservable<any>;
  //  private mail:FirebaseObjectObservable<any[]>;
  private uid:String="CSMbf7EjRFZRCIxzssTDUT4UnR83";
  constructor(public navCtrl: NavController,private af:AngularFire,public navParams:NavParams) {

// this.uid= this.navParams.get('uid');
    this.Rooms = af.database.object('users/'+this.uid+'/status');
  //  this.Rooms.subscribe(
  //       console.log
       
  //     );    
      this.Rooms.subscribe(item => {
        // console.log(item);
        this.obRpi=item
        this.rpi=Object.keys(item)
    console.log(Object.keys(item));
        // return item;
      });  
// console.log("uid home: "+this.uid)
// console.log("dd"+JSON.stringify(this.Rooms));
console.log("Before log obj key")    
    // console.log(Object.keys(this.Rooms));
// console.log(this.Rooms)
// this.Rooms=af.database.object('/Rooms');
// this.Rooms.push({"a":"b"}).then((room) => { console.log(room.key); });
// this.mail=af.database.object('/name').set({ name: 'Test' });;
// .set({ name: 'Test' });
// this.mail.push({});
// this.mail.push({name:'new item'}).then((room) => { console.log(room.key); });;
// af.database.object().put()
  }


  logout() { 
    this.af.auth.logout(); 
    console.log("Log out");
  }
  monitor(mac) {
  console.log("home clicked : "+mac)
    this.navCtrl.push(MonitorPage, { path:'users/'+this.uid+'/status/'+mac});
}
 getItems() {
    // Reset rpi back to all of the items
    // this.initializeItems();

    // set val to the value of the ev target
    // var val = ev.target.value;

    // if the value is an empty string don't filter the rpi
    // if (val && val.trim() != '') {
    //   this.rpi = this.rpi.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
}

}
