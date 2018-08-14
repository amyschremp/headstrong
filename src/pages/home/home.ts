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

  // chooses which icon appears on journal entry
  // chooseIcon(mood) {
  //   var iconClass = ''
  //   switch(mood) {
  //     case 'good':
  //       iconClass = 'far fa-smile'
  //       break
  //     case 'okay':
  //       iconClass = 'far fa-meh'
  //       break
  //     case 'bad':
  //       iconClass = 'far fa-frown'
  //       break
  //     default:
  //       break
  //   }
  //   return iconClass
  // } 

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
