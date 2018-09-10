import { Component } from '@angular/core'
// import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home'
import { LoginPage } from '../pages/login/login'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any

  constructor() {
    let isAuthenticated = JSON.parse(localStorage.getItem('tokenObject'))
    if (isAuthenticated) {
      this.rootPage = HomePage
    } else {
      this.rootPage = LoginPage
    }
  }
}

