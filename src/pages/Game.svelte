<script>
  import { onMount, onDestroy } from 'svelte'
  import Game from '~/components/Game.svelte'
  import Chat from '~/components/Chat/Chat.svelte'
  import { roomStore } from '~/stores/room'
  import { push } from 'svelte-spa-router'
  import { chatStore } from '~/stores/chat'
  import { clientStore } from '~/stores/client'
  import { Socket, IN_GAME } from '~/utils/websocket.js'

  export let params

  let isGameStart = false // to Store

  const onMessage = (e) => {
    const data = JSON.parse(e.data)
    console.log(data)
    if (data.messageType === 'chat') {
      $chatStore = [...$chatStore, data]
      if (data.message === 'start') {
        isGameStart = true
      } else if (data.message === 'finish') {
        isGameStart = false
      }
    }
  }

  const socket = new Socket(IN_GAME($roomStore.roomId, $clientStore.name), onMessage)

  onMount(() => {
    if ($roomStore.roomId === undefined) {
      push('/')
    }
  })

  onDestroy(() => {
    $chatStore = []
    socket.ws.onclose()
  })
</script>

<div class="game">
  <Game {socket} {isGameStart} />
  <Chat {socket} />
</div>

<style lang="scss">
  .game {
    display: flex;
    width: 100%;
  }
</style>
