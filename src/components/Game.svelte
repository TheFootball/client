<script>
  import { tick } from 'svelte'
  import startGame from '~/core/game'
  import Chat from '~/components/Chat/Chat.svelte'

  const gameGo = async () => {
    await tick()
    startGame(Math.floor(innerWidth * 0.7), innerHeight)
  }
</script>

<div class="notion">
  <button on:click={gameGo}>start</button>
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
  }
  .game {
    display: flex;
    .chatting-wrapper {
      width: 31%;
    }
  }
</style>
