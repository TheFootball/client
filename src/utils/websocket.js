import { messageFactory, messageType } from '~/core/chat/chat'
import { WS_URL } from './config'
import { ROOM } from './endpoints'

const onOpen = (url) => (event) => {
  console.log('OPEN!' + url)
  console.log(event)
}

const onClose = (url) => () => {
  console.log('CLOSED!' + url)
}

const onError = (event) => {
  alert(event.type)
}

export const IN_GAME = (roomId, username) => WS_URL + ROOM(roomId) + `?username=${username}`
export class Socket {
  static singletons = {}

  constructor(url, onMessage) {
    if (Socket.singletons[url]) return Socket.singletons[url]
    this.url = url
    this.ws = new WebSocket(url)
    this.ws.onopen = onOpen(url)
    this.ws.onclose = onClose.bind(this)
    this.ws.onmessage = onMessage
    this.ws.onerror = onError

    Socket.singletons[url] = this
    return this
  }

  onClose() {
    Socket.singletons[this.url] = undefined
    console.log('CLOSED!' + this.url)
  }

  send(msg) {
    const json = messageFactory(msg, messageType.chat)
    this.ws.send(json)
  }

  command(c) {
    if (!['start'].includes(c)) throw new Error('invalid command')

    const msg = messageFactory(c, messageType.command)
    this.ws.send(msg)
  }
}
