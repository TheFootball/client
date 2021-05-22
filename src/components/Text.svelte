<script>
    export let weight = 'bold'
    export let size = "16px"

    const className = `plain-text ${weight} ${size}`;
</script>

<span class={className} style={{fontsize: size}}>
    <slot></slot>
</span>

<style lang="scss">
    .plain-text {
        &.bold {
            font-weight: 700;
        }
    }
</style>