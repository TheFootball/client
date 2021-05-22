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
    margin-bottom: 10px;
    .chat-info {
      display: flex;
      align-items: flex-end;
      padding: 0 4px;

      &__name {
        font-size: 18px;
        line-height: 22px;
        margin-right: 12px;
        font-weight: 700;
      }
      &__time {
        font-size: 8px;
        color: #ababab;
      }
    }
    .chat-content {
      border: 1px solid #b6b6b6;
      box-sizing: border-box;
      border-radius: 10px;
      background: rgba(242, 242, 242, 0.34);
      padding: 6px 4px;
    }
  }
</style>
