import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { EntriesProvider } from '../../providers/entries/entries';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  // initial variables for mood
  good = false
  okay = false
  bad = false

  constructor(
    private navParams: NavParams,
     private view: ViewController,
     private entriesProvider: EntriesProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  save(input) {
    let payload = {
      timestamp: new Date(),
      mood: this.good ? 'good' : '' || this.okay ? 'okay' : '' || this.bad ? 'bad' : '',
      entry: input.value.journal
    }
    this.entriesProvider.saveEntry(payload).then(res => {
      if (res.status === 200) {
        this.closeModal()
      } else {
        window.alert('error')
      }
    })
  }

  changeValue(value) {
    // resetting the values in case user changes their answer
    this.good = false
    this.okay = false
    this.bad = false

    // final selected answer is true
    this[value] = true
  }

  closeModal() {
    this.view.dismiss();
  }

}
