import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'signup'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usersProvider: UsersProvider
  ){
  
  }

  firstName = null
  email = null
  password = null
  verifyPass = null

  createUser(input) {
    if (input.value.password === input.value.verifyPass) {
      let payload = {
        firstName: input.value.firstName,
        email: input.value.email,
        password: input.value.password
      }
      this.usersProvider.createUser(payload).then(res => {
        if (res.status === 200) {
          return this.navCtrl.push(HomePage)
        } else {
          console.error('error')
        }
      })
    } else {
      window.alert('error')
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage')
  }
}
