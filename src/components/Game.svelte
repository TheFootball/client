<script>
  import { tick } from 'svelte'
  import startGame from '~/core/game'
  import Chat from '~/components/Chat/Chat.svelte'
  import { roomStore } from '~/stores/room'

  export let copyElement
  const gameGo = async () => {
    await tick()
    startGame(Math.floor(innerWidth * 0.7), innerHeight)
  }
  const copyCode = () => {
    copyElement.focus()
    copyElement.select()
    document.execCommand('copy')
    alert('복사완료')
  }
</script>

<div class="notion">
  <button on:click={gameGo}>start</button>
  <button on:click={copyCode}>copy room code</button>
  <textarea readonly bind:this={copyElement} type="text" class="roomcode">{$roomStore.code}</textarea>
  <div class="add">추가</div>
</div>

<div class="game">
  <canvas
    width={Math.floor(innerWidth * 0.7)}
    height={innerHeight}
    style="background: url('./assets/images/background.svg');margin:0"
  />
  <div class="chatting-wrapper">
    <Chat />
  </div>
</div>

<style lang="scss">
  .notion {
    position: absolute;
    top: 0;
    left: 0;
    .roomcode {
      height: 16px;
      opacity: 0;
    }
  }
  .game {
    display: flex;
    .chatting-wrapper {
      width: 31%;
    }
  }
</style>
