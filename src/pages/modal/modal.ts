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

  closeModal() {
    this.view.dismiss();
  }

}
