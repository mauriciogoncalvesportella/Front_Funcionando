import io from 'socket.io-client'
import store from '@/store/index.js'

export default {
  install (Vue) {
    Vue.prototype.$socketio = {
      socket: null,
      alreadyJoined: false,

      onConnect () {
        this.connected = true
        store.commit('SocketStatus/SET_CONNECTED', true)
        if (!this.alreadyJoined) {
          this.alreadyJoined = true
          console.log('[Vue/Plugins/Socketio.io] Conexão Socket OK!');

          [
            'FilaEspera/joinFilaEsperaSocket',
            'Fone/joinFoneSocket',
            'AtendimentosOnline/joinAtendimentosOnlineSocket',
          ].forEach(action => {
            store.dispatch(action)
          })
        }
      },

      onError (err) {
        store.commit('SocketStatus/SET_CONNECTED', false)
        console.log('[Vue/Plugins/Socketio.io] Erro de conexão', err)
      },

      onDisconnect (reason) {
        store.commit('SocketStatus/SET_CONNECTED', false)
        console.log(`[Vue/Plugins/Socketio.io] Desconectado. Reason = ${reason}`)
        if (reason === 'io server disconnect' || reason === 'io client disconnect') {
          console.log('[Vue/Plugins/Socket.io] Fechando o Socket')
          this.alreadyJoined = false
          this.startListeners = false
          this.socket?.close()
          this.socket = null
        } else {
          console.log('[Vue/Plugins/Socket.io] Reconectando Socket')
          this.alreadyJoined = false
        }
      },

      clientDisconnect () {
        this.socket.disconnect()
      },

      async connect () {
        if (!this.socket) {
          console.log('[Vue/Plugins/Socket.io] Inciando Conexão')
          return new Promise((resolve, reject) => {
            this.socket = io(process.env.VUE_APP_URL, {
              path: '/api/socketio',
              transports: ['websocket'],
            })

            this.socket.on('error', (err) => {
              this.onError(err)
              reject(err)
            })
            this.socket.on('connection_error', (err) => {
              this.onError(err)
              reject(err)
            })
            this.socket.on('connect', () => {
              this.onConnect()
              resolve()
            })
            this.socket.on('disconnect', (reason) => {
              this.onDisconnect(reason)
            })
          })
        }
      },
    }
  },
}
