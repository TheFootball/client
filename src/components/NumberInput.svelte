<script>
    export let width = "892px"
    export let margin = "0 0";
    export let onChange = (e) => e;
    export let inputProps = {};
    export let name;
    export let placeholder = "";

    let className = "txt-input"
</script>

<input type="number" {...inputProps} on:change={onChange} style={`width: ${width}; margin: ${margin}`} class={className} placeholder={placeholder} name={name}>

<style lang="scss" >
    .txt-input {
        font-size: 32px;;
        padding: 1rem 2rem;
        border: 3px solid #FF9840;
        border-radius: 10px;
        outline: none;
    }
</style>