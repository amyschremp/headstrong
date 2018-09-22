import { Injectable } from '@angular/core';
import axios from 'axios';
import Config from '../config'

if (Config.APP_ENV === 'LOCAL') {
  var baseUrl = 'http://localhost:3000'
} else {
  var baseUrl = 'https://api.headstrong.com'
}

@Injectable()
export class EntriesProvider {

  constructor() {
  }

  tokenObject = localStorage.getItem('tokenObject')

  api = axios.create({ 
    baseURL: baseUrl,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "Accept": "*/*",
      "Authorization": `Bearer ${this.tokenObject}`
    }
  })

  getAllEntries() {
    return this.api.get('/api/entries', {data: {}})
  }

  saveEntry(payload) {
    return this.api.post('/api/entries/add', payload)
  }

  editEntry(payload) {
    return this.api.post('/api/entries/edit', payload)
  }

  deleteEntry(payload) {
    return this.api.post('/api/entries/delete', payload)
  }

}
