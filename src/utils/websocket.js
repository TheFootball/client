import { WS_URL } from './config'
import { ROOM } from './endpoints'

const onOpen = (url) => (event) => {
  console.log('OPEN!' + url)
  console.log(event)
}

const onClose = (url) => () => {
  console.log('CLOSED!' + url)
}

const onMessage = (event) => {
  // 여기서 온다 - 적절한 처리
  console.log(event)
  const data = JSON.parse(event.data)
  console.log(data)
}

const onError = (event) => {
  alert(event.type)
}

export const IN_GAME = (roomId, username) => WS_URL + ROOM(roomId) + `?username=${username}`
export class Socket {
  static singletons = {}

  constructor(url) {
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
    this.ws.send(msg)
  }
}