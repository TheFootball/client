<script>
  import Game from '~/components/Game.svelte'
  import Chat from '~/components/Chat/Chat.svelte'

  export let params = {}
</script>

<Game />
<Chat id={params.id} />

<style lang="scss">
  div {
    > button {
      width: 100px;
    }
  }
</style>
