import { Component } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

 
import { AngularFire } from 'angularfire2';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   nav: Nav;//+++
  rootPage : any= TabsPage;
pages: Array<{title: string, component: any}>;//+++

 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if(!auth)
        this.rootPage = LoginPage;
      else
        this.rootPage = TabsPage;
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
          this.pages = [//+++
      { title: 'Login', component: LoginPage }

    ];
  }
      openPage(page) {//+++
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}


