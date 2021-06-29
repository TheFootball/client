<script>
  import Button from '~/components/Button.svelte'
  import Text from '~/components/Text.svelte'
  import { go } from '~/utils/router'
</script>

<div class="main">
  <div class="main__cover">
    <div class="main__center">
      <div class="main__center-title">
        <Text color="white" size={112}>The football</Text>
      </div>

      <div class="main__center-buttons">
        <Button onClick={go('/create')}>
          <Text size={27}>Create Room</Text>
        </Button>
        <div class="divider" />
        <Button onClick={go('/join')}>
          <Text size={27}>Join Room</Text>
        </Button>
        <div class="divider" />
        <Button onClick={go('/about')}>
          <Text size={27}>About</Text>
        </Button>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .main {
    width: 100%;
    height: 100vh;
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('../assets/images/mainBackground.svg');
    position: relative;
  }

  .main__cover {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main__center {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .main__center-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .divider {
      height: 36px;
      width: 100%;
    }
  }
</style>
