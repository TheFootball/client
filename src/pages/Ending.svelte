<script>
  export let params = {}
  console.log(params)
</script>

<div class="ending" style="background-image: url(../assets/images/ending-{params.result}.svg)">
  <a href="#/" class="restart-button">
    <img src="/assets/images/restart.svg" alt="" />
    Restart
  </a>
</div>

<style lang="scss">
  .ending {
    width: 100%;
    height: 100vh;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .restart-button {
      position: fixed;
      right: 48px;
      bottom: 48px;
      background-color: white;
      width: 200px;
      height: 70px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ff9b40;
      font-size: 25px;
      font-weight: bold;
      text-decoration: none;
      img {
        margin-right: 8px;
      }
    }
  }
</style>
