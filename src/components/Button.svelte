<script>
  export let width = 382
  export let bgColor = 'white'
  export let onClick = () => ''
  let className = `btn bg-${bgColor}`
</script>

<button class={className} style={`width: ${width}px;`} on:click={onClick()}>
  <slot />
</button>

<style lang="scss">
  .btn {
    padding: 22px 0;
    border: none;
    border-radius: 10px;

    &:hover {
      cursor: pointer;
    }

    &.bg- {
      &white {
        background-color: white;
      }
      &orange {
        background-color: #ff9b40;
      }
    }
  }
</style>
