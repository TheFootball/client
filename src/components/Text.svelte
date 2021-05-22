<script>
    export let as = 'span'
    export let weight = 'bold'
    export let size = 16;
    export let color = "black"

    const className = `plain-text ${weight} ${color}`;
</script>

{#if as === 'span'}
<span class={className} style={`font-size: ${size}px`}>
    <slot></slot>
</span>    
{/if}

{#if as === 'p'}
<p class={className} style={`font-size: ${size}px`}>
    <slot></slot>
</p>
{/if}


<style lang="scss">
    .plain-text {
        &.bold {
            font-weight: 700;
        }

        &.black {
            color: black;
        }

        &.white {
            color: white;
        }

        &.orange {
            color: #FF9B40;
        }
    }
</style>