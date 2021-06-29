<script>
  import Button from '~/components/Button.svelte'
  import Text from '~/components/Text.svelte'
  import TextInput from '~/components/TextInput.svelte'
  import { api } from '~/utils/api'
  import { ROOM } from '~/utils/endpoints'
  import { roomStore } from '~/stores/room'
  import { push } from 'svelte-spa-router'
  import { clientStore } from '~/stores/client'

  let roomId = ''
  const onChangeRoomId = (e) => {
    roomId = e.target.value
  }
  const onChangeHostname = (e) => {
    $clientStore.name = e.target.value
  }

  const onClick = async () => {
    try {
      const { data } = await api.post(ROOM(roomId), {}, { params: { username: $clientStore.name } })

      console.log('방정보', data.room)
      roomStore.set({ ...data.room, isHost: true })
      push(`/game/${data.room.roomId}/`)
    } catch (e) {
      console.log(e.response || e)
    }
  }
</script>

<div class="join">
  <div class="join__title-and-input">
    <Text size={82} color="orange">Create Room</Text>
    <TextInput margin="39px 0 0 0" placeholder="Enter the room ID" onChange={onChangeRoomId} value={roomId} />
    <TextInput
      margin="39px 0 0 0"
      placeholder="Enter your name"
      onChange={onChangeHostname}
      value={$clientStore.name}
    />
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
