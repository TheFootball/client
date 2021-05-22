<script>
  import Game from '~/components/Game.svelte'

  export let params
</script>

<Game />

<style lang="scss">
  div {
    > button {
      width: 100px;
    }
  }
</style>
