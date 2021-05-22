<script>
  import { chatStore } from '~/stores/chat'
  import { clientStore } from '~/stores/client'
  import ChatEntity from './ChatEntity.svelte'
  import Chat from '~/components/Chat.svelte'
  import { onMount } from 'svelte'

  export let id

  // 소켓온 후 누가 들어왓다 띄우기
  // 피하는 사람 위치 변화
  // 유효한 채팅 서버로 보내주기

  let ws
  const url = `ws://192.168.0.95:9000/ws/${id}/join/${$clientStore.name}`

  var onOpen = function (event) {
    console.log('OPEN!' + url)
    console.log(event)
  }

  var onClose = function () {
    console.log('CLOSED!' + url)
    ws = null
  }

  var onMessage = function (event) {
    console.log(event)
    $chatStore.push(event)
    $chatStore = $chatStore
    // $clientStore = event
    // addMessage(data)
  }

  var onError = function (event) {
    alert(event.type)
  }

  const open = function () {
    ws = new WebSocket(url)
    ws.onopen = onOpen
    ws.onclose = onClose
    ws.onmessage = onMessage
    ws.onerror = onError
  }

  var sendMsg = function () {
    ws.send(
      JSON.stringify({
        event: 'chat',
        data: JSON.stringify({}),
      }),
    )
  }

  onMount(() => {
    open()
  })
</script>

<div class="chat">
  <div class="chat-title">
    <div>Junction X Seoul 2021</div>
    <img src="./assets/images/close.svg" />
  </div>
  <div class="chat-content">
    {#each $chatStore as chat}
      <Chat {chat} />
    {/each}
  </div>
  <div class="chat-input">
    <textarea />
    <button on:click={sendMsg}>send</button>
  </div>
</div>

<style lang="scss">
  .chat {
    display: flex;
    flex-direction: column;
    height: 100%;
    .chat-title {
      > div {
        font-weight: bold;
        font-size: 25px;
      }
      padding: 10px;
      background: #f5f5f5;
      height: 10%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #bbbbbb;
    }
    .chat-content {
      padding: 52px 35px;
      height: 70%;
    }
    .chat-input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 25px;
      height: 10%;
      border-top: 11px solid #f5f5f5;
      textarea {
        width: 80%;
        height: 50px;
        border: 0;
        border-radius: 8px;
        border: 1px solid #b6b6b6;
      }
      button {
        width: 20%;
        height: 55px;
        width: 60px;
        border: 0;
        background-color: orange;
        color: white;
        border-radius: 8px;
        cursor: pointer;
      }
    }
  }
</style>
