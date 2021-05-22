<script>
  import Button from '~/components/Button.svelte'
  import Text from '~/components/Text.svelte'
  import NumberInput from '~/components/NumberInput.svelte'
  import TextInput from '~/components/TextInput.svelte'
  import { api } from '~/utils/api'
  import { CREATE_ROOM } from '~/utils/endpoints'
  import { roomStore } from '~/stores/room'
  import { push } from 'svelte-spa-router'
  import { clientStore } from '~/stores/client'

  let difficulty = 0
  let maxClients = 0
  let name = ''
  const onChange1 = (e) => {
    maxClients = +e.target.value
  }
  const onChange2 = (e) => {
    difficulty = +e.target.value
  }
  const onChange3 = (e) => {
    $clientStore.name = e.target.value
  }

  const onClick = async () => {
    if (difficulty > 3 || difficulty < 1) {
      alert('The difficulty level must be between 1 and 3.')
      return
    }
    if (maxClients > 100 || maxClients < 50) {
      alert('The maxClients must be between 50 and 100.')
      return
    }
    try {
      const { data } = await api.post(CREATE_ROOM, {
        difficulty,
        maxClients,
      })
      roomStore.set(data)
      push(`/game/${data.code}/`)
    } catch (e) {
      console.log(e)
    }
  }
</script>

<div class="join">
  <div class="join__title-and-input">
    <Text size={82} color="orange">Create Room</Text>
    <NumberInput
      margin="39px 0 0 0"
      placeholder="Enter the Max Participants (50 ~ 100)"
      onChange={onChange1}
      value={maxClients}
    />
    <NumberInput
      margin="39px 0 0 0"
      placeholder="Enter the Difficulty Level (1 ~ 3)"
      onChange={onChange2}
      value={difficulty}
    />
    <TextInput margin="39px 0 0 0" placeholder="Enter your name" onChange={onChange3} value={$clientStore.name} />
  </div>
  <div class="submit-button">
    <Button bgColor="orange" {onClick}><Text color="white">Create</Text></Button>
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
