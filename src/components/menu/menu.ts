import { Component, ViewChild } from '@angular/core';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../../pages/login/login';
import { Nav, NavController } from 'ionic-angular';

/**
 * Generated class for the MenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  @ViewChild(NavController) nav: Nav

  constructor(
    private usersProvider: UsersProvider,
    ) {

  }
  
  logout() {
    this.usersProvider.logout().then(res => {
      if (res.status === 200) {
        localStorage.removeItem('token')
        return this.nav.setRoot(LoginPage)
      } else {
        console.error('error')
      }
    })
  }

}
