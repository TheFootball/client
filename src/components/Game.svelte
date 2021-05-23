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
    alert('Copy Success!')
  }
</script>

<div class="notion">
  <button on:click={gameGo}>
    <img src="/assets/images/play.svg" alt="" />
  </button>
  <button on:click={copyCode}>
    <img src="/assets/images/copy.svg" alt="" />
  </button>
  <textarea readonly bind:this={copyElement} type="text" class="roomcode">{$roomStore.code}</textarea>
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
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    padding: 24px;
    .roomcode {
      width: 16px;
      height: 16px;
      opacity: 0;
    }
    button {
      box-shadow: 0px 4px 4px 0px #00000033;
      width: 48px;
      height: 48px;
      border-radius: 100%;
      background-color: white;
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:not(:last-child) {
        margin-bottom: 12px;
      }
    }
  }
  .game {
    display: flex;
    .chatting-wrapper {
      width: 31%;
    }
  }
</style>
