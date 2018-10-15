import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    if (!input.value.firstName) {
      window.alert('Please enter your first name.')
    } else if (!input.value.email) {
      window.alert('Please enter a valid email address.')
    } else if (!input.value.password || !input.value.verifyPass) {
      window.alert('Please verify your password.')
    } else {
      if (input.value.password === input.value.verifyPass) {
        let payload = {
          firstName: input.value.firstName,
          email: input.value.email,
          password: input.value.password
        } 
        this.usersProvider.createUser(payload).then(res => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data)
            return this.navCtrl.setRoot(HomePage)
          } else {
            console.error('error')
          }
        }).catch(err => {
        if (err) {
          if (err.response.data.code === 11000) {
            window.alert('User already exists.')
          } else {
            window.alert('Oops! Something went wrong.')
          }
        }
        }) 
      } else {
        window.alert('Passwords do not match.')
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage')
  }
}
