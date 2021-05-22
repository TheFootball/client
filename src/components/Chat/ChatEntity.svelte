<script>
  export let name
  export let time
  export let content
</script>

<div class="chat-entity">
  <div class="chat-info">
    <div class="chat-info__name">{name}</div>
    <div class="chat-time__time">{time}</div>
  </div>
  <div class="chat-content">{content}</div>
</div>

<style lang="scss">
  .chat-entity {
    .chat-info {
      display: flex;
      &__name {
        font-size: 18px;
        line-height: 22px;
      }
      &__title {
        font-size: 15px;
        color: #ababab;
      }
    }
    .chat-content {
      border: 1px solid #b6b6b6;
      box-sizing: border-box;
      border-radius: 10px;
    }
  }
</style>
