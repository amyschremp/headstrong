import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController, private modal: ModalController) {

  }

  openModal() {
    const myModal = this.modal.create('ModalPage');

    myModal.present();
  }

}
