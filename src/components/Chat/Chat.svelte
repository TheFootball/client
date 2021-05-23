<script>
  import { chatStore } from '~/stores/chat'
  import { clientStore } from '~/stores/client'
  import { roomStore } from '~/stores/room'
  import ChatEntity from '~/components/Chat/ChatEntity.svelte'
  import { onMount, onDestroy } from 'svelte'
  import { formatDate } from '~/utils/time'

  let chatInput = ''
  let chatList

  let ws
  const url = `ws://192.168.0.95:9000/ws/${$roomStore.code}/join/${$clientStore.name}`

  const onOpen = (event) => {
    console.log('OPEN!' + url)
    console.log(event)
  }

  const onClose = () => {
    console.log('CLOSED!' + url)
    ws = null
  }

  const onMessage = (event) => {
    const data = JSON.parse(event.data)
    const { isHost, content } = JSON.parse(data.data)
    if (isHost && ['left', 'right'].includes(content)) {
      return
    }
    if (data.event === 'chat') {
      $chatStore.push(JSON.parse(data.data))
      $chatStore = $chatStore
    } else {
      $clientStore = { ...data, name: data.Name }
    }
  }

  const onError = (event) => {
    alert(event.type)
  }

  const open = () => {
    ws = new WebSocket(url)
    ws.onopen = onOpen
    ws.onclose = onClose
    ws.onmessage = onMessage
    ws.onerror = onError
  }

  const sendMsg = () => {
    ws.send(
      JSON.stringify({
        event: 'chat',
        data: JSON.stringify({
          name: `${$clientStore.name}`,
          content: chatInput,
          timeStamp: new Date().getTime() / 1000,
          isHost: `${$roomStore.isHost}`,
        }),
      }),
    )
    chatInput = ''
    chatList.scrollTo(0, 900)
  }

  onMount(() => {
    open()
  })

  onDestroy(() => {
    $chatStore = []
    ws.close()
  })
</script>

<div class="chat">
  <div class="chat-title">
    <div>Junction X Seoul 2021</div>
    <img src="./assets/images/close.svg" />
  </div>
  <div class="chat-content" bind:this={chatList}>
    {#each $chatStore as chat}
      <ChatEntity name={chat.name} time={formatDate(new Date(chat.timeStamp * 1000))} content={chat.content} />
    {/each}
  </div>
  <div class="chat-input">
    <textarea bind:value={chatInput} />
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
      height: 500px;
      overflow: scroll;
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
