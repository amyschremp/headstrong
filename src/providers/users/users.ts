import { Injectable } from '@angular/core';
import axios from 'axios'
import Config from '../config'

if (Config.APP_ENV === 'LOCAL') {
  var baseUrl = 'http://localhost:3000'
} else {
  var baseUrl = 'https://api.headstrong.com'
}

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

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

  createUser(payload) {
    return this.api.post('/api/users/add', payload)
  }

  login(payload) {
    return this.api.post('/api/users/login', payload)
  }

}
