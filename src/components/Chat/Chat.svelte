<script>
  import ChatEntity from '~/components/Chat/ChatEntity.svelte'
  import { unixNanoToDaytime } from '~/utils/time'
  import { chatStore } from '~/stores/chat'

  export let socket

  let chatInput = ''
  let chatListRef = null

  const sendMsg = () => {
    if (chatInput.trim().length === 0) return
    socket.send(chatInput.trim())
    chatInput = ''
    chatListRef.scrollTo(0, 900)
  }

  const onEnter = (e) => {
    if (e.key === 'Enter') sendMsg()
  }
</script>

<div class="chat">
  <div class="chat-title">
    <div>Junction X Seoul 2021</div>
    <img src="./assets/images/close.svg" />
  </div>
  <div class="chat-content" bind:this={chatListRef}>
    {#each $chatStore as chat}
      <ChatEntity name={chat.sender} time={unixNanoToDaytime(chat.timestamp)} content={chat.message} />
    {/each}
  </div>
  <div class="chat-input">
    <textarea on:keyup={onEnter} bind:value={chatInput} />
    <button on:click={sendMsg}>send</button>
  </div>
</div>

<style lang="scss">
  .chat {
    width: 30%;
    display: flex;
    flex-direction: column;
    height: 100%;
    .chat-title {
      > div {
        font-weight: bold;
        font-size: 25px;
      }
      padding: 10px;
      background: #f5f5f5;
      height: 10%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #bbbbbb;
    }
    .chat-content {
      padding: 52px 35px;
      height: 500px;
      overflow: scroll;
    }
    .chat-input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 25px;
      height: 10%;
      border-top: 11px solid #f5f5f5;
      textarea {
        width: 80%;
        height: 50px;
        border: 0;
        border-radius: 8px;
        border: 1px solid #b6b6b6;
      }
      button {
        width: 20%;
        height: 55px;
        width: 60px;
        border: 0;
        background-color: orange;
        color: white;
        border-radius: 8px;
        cursor: pointer;
      }
    }
  }
</style>
