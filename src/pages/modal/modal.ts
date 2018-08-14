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
  smile = false
  meh = false
  frown = false

  entry = null

  constructor(
    private navParams: NavParams,
     private view: ViewController,
     private entriesProvider: EntriesProvider
  ) {
    let entry = navParams.get('entry') || null
    this.entry = entry
    this[entry.mood] = true
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  save(input) {
    let payload = {
      timestamp: new Date(),
      mood: this.smile ? 'smile' : '' || this.meh ? 'meh' : '' || this.frown ? 'frown' : '',
      entry: input.value.journal
    }
    this.entriesProvider.saveEntry(payload).then(res => {
      if (res.status === 200) {
        this.closeModal(res.data)
      } else {
        window.alert('error')
      }
    })
  }

  changeValue(value) {
    // resetting the values in case user changes their answer
    this.smile = false
    this.meh = false
    this.frown = false

    // final selected answer is true
    this[value] = true
  }

  closeModal(data) {
    this.view.dismiss(data);
  }

}
