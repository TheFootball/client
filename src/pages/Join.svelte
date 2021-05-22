<script>
import axios from "axios";

    import Button from "~/components/Button.svelte";
    import Text from "~/components/Text.svelte";
    import TextInput from "~/components/TextInput.svelte";

    const onChange = (e) => {
        console.log(e.target.value);
    }

    let value = "";

    const onClick = () => {
        // join room
    }
</script>

<div class="join">
    <div class="join__title-and-input">
        <Text size={82} color="orange">Join Room</Text>
        <TextInput margin="39px 0 0 0" placeholder="Enter the room code" onChange={onChange} value={value} />
    </div>
    <div class="submit-button">
        <Button bgColor="orange"><Text color="white">Join</Text></Button>
    </div>
</div>

<style lang="scss">
    .join {
        width: 100%;
        height: 100vh;

        background-size: contain;
        background-repeat: no-repeat;
        background-position: bottom;
        background-image: url("../assets/images/joinBackground.svg");

        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;
    }

    .join__title-and-input {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .submit-button {
        margin-top: 180px;
    }
</style>