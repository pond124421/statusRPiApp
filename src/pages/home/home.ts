import { Component } from '@angular/core';

import { NavController,NavParams,ToastController,AlertController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MonitorPage } from '../monitor/monitor'
import { AngularFire, AuthMethods, AuthProviders ,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Network } from '@ionic-native/network';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rpi;
  obRpi;
  aboutPage = AboutPage;
  items: string[];

   private Rooms:FirebaseObjectObservable<any>;
  //  private mail:FirebaseObjectObservable<any[]>;
  private uid:String="CSMbf7EjRFZRCIxzssTDUT4UnR83";
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,private toast : ToastController,private network : Network,private af:AngularFire,public navParams:NavParams) {

// this.uid= this.navParams.get('uid');
    this.Rooms = af.database.object('users/'+this.uid+'/status');
  //  this.Rooms.subscribe(
  //       console.log
       
  //     );    
      this.Rooms.subscribe(item => {
        // console.log(item);
        this.obRpi=item
        this.rpi=Object.keys(item)
        // return item;
    });  
   
    // this.items.push(this.rpi)
          // console.log(`rpi : ${this.rpi}`);
      // console.log(`Items : ${this.items}`)
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
  displayNetwork(connectStatus:string) {
       this.toast.create({

      message: `Hello : ${connectStatus}`,
      duration: 3000
    }).present();
  }

  ionViewDidEnter() {
    console.log('ionView didEnter========'+this.network.downlinkMax)

    this.network.onConnect().subscribe(data => {
      console.log("onconnect : "+data);
      // this.displayNetwork('ddd');
    }, error => console.error(error));
  


    this.network.onDisconnect().subscribe(data => console.log(`check network : ${data}`),error => console.error(error));
}
  // }
shutdown(thisRpi) {
  let alert = this.alertCtrl.create({
    title: 'Confirm purchase',
    message: `Do you want to shutdown ${thisRpi} ?`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        handler: data => {
          this.af.database.object('users/' + this.uid + '/status/' + thisRpi).update({'shutdown':1});
          console.log('shutdowned');
        }
      }
    ]
  });
  alert.present();
}
  prompt(thisRpi)  {
  let alert = this.alertCtrl.create({
    title: 'Prompt',
    inputs: [
      {
        name: 'command',
        placeholder: 'Command'
      },

    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Run',
        handler: data => {
          this.af.database.object('users/' + this.uid + '/status/' + thisRpi).update(data);

          // if (User.isValid(data.username, data.password)) {
          //   // logged in!
          // } else {
          //   // invalid login
          //   return false;
          // }
        }
      }
    ]
  });
  alert.present();
}
  logout() { 
    this.af.auth.logout(); 
    console.log("Log out");
  }
  monitor(mac) {
  console.log("home clicked : "+mac)
    this.navCtrl.push(MonitorPage, { path:'users/'+this.uid+'/status/'+mac});
}
 getItems(ev:any) {
  //  this.items.push(this.rpi);
    // Reset rpi back to all of the items
    // this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

          if (val && val.trim() != '') {
      this.rpi = this.rpi.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

    // if (val && val.trim() != '') {
    //   this.items = this.items.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
}

}
