<script>
  export let width = '892px'
  export let margin = '0 0'
  export let onChange = (e) => e
  export let inputProps = {}
  export let name
  export let placeholder = ''

  let className = 'txt-input'
</script>

<input
  type="text"
  {...inputProps}
  on:change={onChange}
  style={`width: ${width}; margin: ${margin}`}
  class={className}
  {placeholder}
  {name}
/>

<style lang="scss">
  .txt-input {
    font-size: 32px;
    padding: 1rem 2rem;
    border: 3px solid #ff9840;
    border-radius: 10px;
    outline: none;
  }
</style>
