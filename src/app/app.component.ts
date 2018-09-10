import { Component } from '@angular/core';

// import { HomePage } from '../pages/home/home';
// import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any

  constructor() {
    if (true) {
      this.rootPage = LoginPage
    } else {
      // this.rootPage = HomePage
    }
  }
}

