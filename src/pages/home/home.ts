import { Component, ViewChild } from '@angular/core';
import { ModalController, MenuController, NavController, Nav, NavParams } from 'ionic-angular';
import { EntriesProvider } from '../../providers/entries/entries';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("menu") nav: Nav

  entries = []

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private modal: ModalController,
    private entriesProvider: EntriesProvider,
    public menuCtrl: MenuController,
  ) {

  }

  openModal(obj) {
    const myModal = this.modal.create('ModalPage', { entry: obj })
    myModal.onDidDismiss(data => {
      if (data === undefined) return
      if (data.edited === true) {
        data._id = data.id
        delete data.id
        let replaceIndex = this.entries.map(entry => entry._id).indexOf(data._id)
        this.entries.splice(replaceIndex, 1, data)
      } else {
        this.entries.push(data)
      }
    })
    myModal.present()
  }

  openMenu() {
    this.menuCtrl.open()
  }

  closeMenu() {
    this.menuCtrl.close()
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
