import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
<<<<<<< HEAD
import { UsersProvider } from '../../providers/users/users';
import { EntriesProvider } from '../../providers/entries/entries'

=======
>>>>>>> 6b6c4b09293125b4df1472de165c0a00c0e8383c

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

  @ViewChild("menu") nav: Nav

  constructor(
    private menuCtrl: MenuController,
    public appCtrl: App,
    public usersProvider: UsersProvider,
    public entriesProvider: EntriesProvider
    ) {

  }
  
  logout() {
    // gets the root navigation controller
    if (localStorage) {
      localStorage.removeItem('token')
    }
    this.entriesProvider.clearToken()
    this.usersProvider.logout().then(res => { return res }).catch(err => { window.alert(err) })
    this.appCtrl.getRootNav().setRoot(LoginPage)
    this.menuCtrl.close()
  }

}
