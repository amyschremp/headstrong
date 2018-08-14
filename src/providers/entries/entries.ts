import { Injectable } from '@angular/core';
import axios from 'axios';

const baseUrl = 'http://localhost:3000'

/*
  Generated class for the EntriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EntriesProvider {

  constructor() {
    console.log('Hello EntriesProvider Provider');
  }

  getAllEntries() {
    return axios.get(`${baseUrl}/api/entries`)
  }

  saveEntry(payload) {
    return axios.post(`${baseUrl}/api/entries/add`, payload)
  }

  editEntry(payload) {
    
  }

  deleteEntry(payload) {
    return axios.post(`${baseUrl}/api/entries/delete`, payload)
  }

}
