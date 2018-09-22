import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usersProvider: UsersProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(input) {
    let payload = {
      email: input.value.email,
      password: input.value.password
    }
    this.usersProvider.login(payload).then(res => {
      if (res.status === 200) {
        localStorage.setItem('tokenObject', res.data)
        return this.navCtrl.setRoot(HomePage)
      } else {
        console.error('error')
      }
    })
  }

  signUp() {
    this.navCtrl.push(SignupPage)
  }

}
