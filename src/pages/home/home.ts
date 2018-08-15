import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { EntriesProvider } from '../../providers/entries/entries';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  entries = []

  constructor(
    private navParams: NavParams,
    private modal: ModalController,
    private entriesProvider: EntriesProvider
  ){

  }

  openModal(obj) {
    const myModal = this.modal.create('ModalPage', {entry: obj});
    myModal.onDidDismiss(data => {
      if (data === undefined) return
      if (data.edited === true) {
        data._id = data.id
        delete data.id
        let replaceIndex = this.entries.map(entry => entry._id ).indexOf(data._id)
        this.entries.splice(replaceIndex, 1, data)
      } else {
        this.entries.push(data)
      }
    })
    myModal.present();
  }

  deleteEntry(id) {
    let payload = {
      id: id
    }
    this.entriesProvider.deleteEntry(payload).then(res => {
      if (res.status === 200) {
        let removeIndex = this.entries.map(entry => entry._id).indexOf(res.data._id)
        if (removeIndex > -1) this.entries.splice(removeIndex, 1)
      } else {
        console.error('error')
      }
    })
  }

  editEntry(obj) {
    this.openModal(obj)
  }

  ionViewDidEnter() {
    this.entriesProvider.getAllEntries().then(res => {
      res.data.forEach(entry => {
        this.entries.push(entry)
      })
    })
  }
}
