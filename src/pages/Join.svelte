<script>
  import Button from '~/components/Button.svelte'
  import Text from '~/components/Text.svelte'
  import TextInput from '~/components/TextInput.svelte'
  import { push } from 'svelte-spa-router'

  const onChange1 = (e) => {
    value = e.target.value1
  }
  const onChange2 = (e) => {
    value = e.target.value2
  }

  let value1 = ''
  let value2 = ''

  const onClick = () => {
    try {
      push(`/game/${value1}/${value2}`)
    } catch (e) {
      console.log(e)
    }
  }
</script>

<div class="join">
  <div class="join__title-and-input">
    <Text size={82} color="orange">Join Room</Text>
    <TextInput margin="39px 0 0 0" placeholder="Enter the room code" {onChange1} {value1} />
    <TextInput margin="39px 0 0 0" placeholder="Enter yout name" {onChange2} {value2} />
  </div>
  <div class="submit-button">
    <Button {onClick} bgColor="orange"><Text color="white">Join</Text></Button>
  </div>
</div>

<style lang="scss">
  .join {
    width: 100%;
    height: 100vh;

    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    background-image: url('../assets/images/joinBackground.svg');

    display: flex;
    flex-direction: column;
    align-items: center;
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
