import { Injectable } from '@angular/core';
import axios from 'axios'
import Config from '../config'

var baseUrl = Config.APP_ENV === 'LOCAL' ? 'http://localhost:3000' : 'https://api.headstrong.app'

@Injectable()
export class UsersProvider {

  constructor() {
  }

  token = localStorage.getItem('token') || ''

  api = axios.create({ 
    baseURL: baseUrl,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "Accept": "*/*",
      // "Authorization": `Bearer ${this.token}`
    }
  })

  createUser(payload) {
    return this.api.post('/api/users/add', payload)
  }

  login(payload) {
    return this.api.post('/api/users/login', payload)
  }

  logout() {
    return this.api.post('/api/users/logout')
  }

}
