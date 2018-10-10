import { Component, ViewChild } from '@angular/core'
import { HomePage } from '../pages/home/home'
import { LoginPage } from '../pages/login/login'
import { Nav } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild("menu") nav: Nav

  rootPage:any

  constructor(
  ) {
    let isAuthenticated = localStorage.getItem('token')
    if (isAuthenticated) {
      this.rootPage = HomePage
    } else {
      this.rootPage = LoginPage
    }
  }
}

