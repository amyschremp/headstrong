import { Injectable } from '@angular/core';
import axios from 'axios';

const baseUrl = 'https://headstrong.app:8080'
/*
  Generated class for the EntriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EntriesProvider {

  constructor() {
  }

  api = axios.create({ 
    baseURL: baseUrl,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "Accept": "*/*"
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
