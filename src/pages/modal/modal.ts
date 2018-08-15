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
    let editEntry = navParams.get('entry') || null
    if (editEntry) {
      this.entry = editEntry
      this[editEntry.mood] = true
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  save(input) {
    let payload = {
      timestamp: new Date(),
      mood: this.smile ? 'smile' : '' || this.meh ? 'meh' : '' || this.frown ? 'frown' : '',
      entry: input.value.entry
    }
    console.log('this is the save function', payload)
    this.entriesProvider.saveEntry(payload).then(res => {
      if (res.status === 200) {
        this.closeModal(res.data)
      } else {
        window.alert('error')
      }
    })
  }

  edit(input) {
    let payload = {
      id: this.entry._id,
      timestamp: this.entry.timestamp,
      mood: this.smile ? 'smile' : '' || this.meh ? 'meh' : '' || this.frown ? 'frown' : '',
      entry: input.value.entry
    }
    console.log('this is the edit function', payload)
    this.entriesProvider.editEntry(payload).then(res => {
      if (res.status === 200) {
        this.closeModal(res.data)
      } else {
        window.alert('error')
      }
    })
  }

  handle(form) {
    console.log('form', form)
    console.log('this.entry=', this.entry)
    if (!this.smile && !this.meh && !this.frown) {
      console.log(this.smile)
      window.alert('Please enter a mood.')
    } else if ((this.entry) === null) {
      this.save(form)
    } else {
      this.edit(form)
    }


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
