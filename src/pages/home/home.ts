import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { EntriesProvider } from '../../providers/entries/entries';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  entries = []

  constructor(
    private modal: ModalController,
    private entriesProvider: EntriesProvider
  ) {

  }

  openModal() {
    const myModal = this.modal.create('ModalPage');

    myModal.present();
  }

  ionViewDidEnter() {
    this.entriesProvider.getAllEntries().then(res => {
      res.data.forEach(entry => {
        this.entries.push(entry)
      })
    })
  }
}
