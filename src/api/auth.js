import { Client } from './rest-client'
import store from '@/store/index.js'
import { Exception } from 'sass'

const login = async (username, password) => {
  const body = { username, password }
  const res = await Client.post('/auth/login/', body)
  if (res?.token) {
    localStorage.setItem('access_token', res.token)
    store.commit('SET_TOKEN', res.token)
  } else {
    throw new Exception('Login inválido')
  }
}

const logout = async () => {
  await Client.get('/auth/logout')
}

export {
  login,
  logout,
}
