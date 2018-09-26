import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

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
    public appCtrl: App
    ) {

  }
  
  logout() {
    // gets the root navigation controller
    this.appCtrl.getRootNav().setRoot(LoginPage)
    this.menuCtrl.close()
  }

}
