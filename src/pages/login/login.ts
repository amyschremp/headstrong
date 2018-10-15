import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { EntriesProvider } from '../../providers/entries/entries'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild("menu") nav: Nav

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usersProvider: UsersProvider,
    public entriesProvider: EntriesProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(input) {
    if (!input.value.email) {
      window.alert('Please enter your email address.')
    } else if (!input.value.password) {
      window.alert('Please enter your password.')
    } else {
      let payload = {
        email: input.value.email,
        password: input.value.password
      }
      this.usersProvider.login(payload).then(res => {
        localStorage.setItem('token', res.data)
        this.entriesProvider.initToken()
        return this.navCtrl.setRoot(HomePage)
      }).catch(err => {
        window.alert('Username and password do not match')
      })
    }
  }

  signUp() {
    this.navCtrl.push(SignupPage)
  }

}
