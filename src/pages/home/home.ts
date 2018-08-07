import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private modal: ModalController) {

  }

  openModal() {
    const myModal = this.modal.create('ModalPage');

    myModal.present();
  }

}
