<script>
  import { onMount } from 'svelte'
  import Game from '~/components/Game.svelte'
  import { roomStore } from '~/stores/room'
  import { push } from 'svelte-spa-router'

  export let params

  onMount(() => {
    if ($roomStore.roomId === undefined) {
      push('/')
    }
  })
</script>

<Game />

<style lang="scss">
  div {
    > button {
      width: 100px;
    }
  }
</style>
