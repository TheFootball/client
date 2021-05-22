<script>
  import { Canvas } from 'svelte-canvas'
  import { tick } from 'svelte'
  import startGame from '~/core/game'

  const start = async () => {
    await tick()
    startGame()
  }

  start()
</script>

<Canvas />

<style lang="scss">
</style>
