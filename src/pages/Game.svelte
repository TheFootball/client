<script>
  import Game from '~/components/Game.svelte'
  export let params = {}
  import { onMount } from 'svelte'
  import Chat from '~/components/Chat.svelte'
  import ChatList from '~/components/ChatList.svelte'
  import { chatStore } from '~/stores/chat'
  import { clientStore } from '~/stores/client'

  let ws
  const url = `ws://localhost:9000/ws/${params.id}/join/${$clientStore.name}`

  var onOpen = function () {
    console.log('OPEN!' + url)
  }

  var onClose = function () {
    console.log('CLOSED!' + url)
    ws = null
  }

  var onMessage = function (event) {
    console.log(event)
    $chatStore.push(event)
    $chatStore = $chatStore
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

<div>
  <ChatList />
  <button on:click={sendMsg}>게임</button>
</div>

<Game />

<style></style>
