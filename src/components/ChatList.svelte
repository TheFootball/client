<script>
  import { chatStore } from '~/stores/chat'
  import Chat from '~/components/Chat.svelte'
</script>

<div>
  {#each $chatStore as chat}
    <Chat {chat} />
  {/each}
</div>

<style lang="scss">
</style>
