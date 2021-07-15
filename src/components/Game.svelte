<script>
  import { tick } from 'svelte'
  import { clientStore } from '~/stores/client'
  import { roomStore } from '~/stores/room'
  import { chatStore } from '~/stores/chat'
  import { onDestroy } from 'svelte'
  import Chat from '~/components/Chat/Chat.svelte'
  import { IN_GAME, Socket } from '~/utils/websocket'

  const socket = new Socket(IN_GAME($roomStore.roomId, $clientStore.name))

  onDestroy(() => {
    socket.ws.onclose()
    $chatStore = []
  })

  const gameGo = async () => {
    await tick()
    const canvas = document.querySelector('canvas')
    const width = Math.floor(innerWidth * 0.7)
    const height = innerHeight
    canvas.width = width
    canvas.height = height
    let backgroundImg
    const context = canvas.getContext('2d')

    const addButton = document.querySelector('.add')

    const attackerArray = []
    let angle = 0
    let animals = []

    class Attacker {
      constructor(x, y, speed, img, id) {
        this.x = x
        this.y = y
        this.speed = speed
        this.img = img
        this.id = id // 자신의 것인지 확인하는 멤버변수
      }

      draw() {
        if (this.Y > height) {
          this.Y = 0
        }
        context.drawImage(this.img, this.x, this.y)
      }
    }

    let avoiderImage

    class Avoider {
      constructor(x, y, speed, id) {
        this.x = x
        this.y = y
        this.speed = speed
        this.id = id
      }

      draw() {
        if (this.x > width) {
          this.x = 0
        }
        context.drawImage(avoiderImage, this.x, this.y)
      }
    }

    let frameId = 0

    let avoider = ''

    // 소켓
    function render() {
      frameId = requestAnimationFrame(render)
      context.clearRect(0, 0, canvas.width, canvas.height)
      avoider.draw()

      let attacker
      for (let i = 0; i < attackerArray.length; i++) {
        attacker = attackerArray[i]
        if (attacker.y > height) {
          attackerArray.splice(i, 0)
          continue
        } else {
          attacker.y += 2
          // 소켓으로 메시지가 온 경우 id에 해당하는 attacker의 X값을 변화시킴
          attacker.draw()
        }

        // 자신의 캐릭터일때 반짝반짝 넣기

        const dist = Math.hypot(avoider.x - attacker.x, avoider.y - attacker.y)

        if (dist - 35 < 1) {
          console.log('게임끝')
          cancelAnimationFrame(frameId)
        }
      }
    }

    let urls = [
      './assets/images/cat.svg',
      './assets/images/sqrl.svg',
      './assets/images/bird.svg',
      './assets/images/dochi.svg',
      './assets/images/avoider.svg',
    ]

    let imageCount = 0

    urls.forEach((url) => {
      const image = new Image()
      image.src = url
      image.addEventListener('load', () => {
        imageCount += 1
        if (url !== './assets/images/avoider.svg') {
          animals.push(image)
        } else if (url === './assets/images/avoider.svg') {
          avoiderImage = image
        }

        if (imageCount === 5) {
          avoider = new Avoider(width / 2, height - 200, 100)
          render()
        }
      })
    })

    if ($roomStore.isHost) {
      window.addEventListener('keydown', (e) => {
        console.log(e)
        if (e.key === 'ArrowLeft') {
          avoider.x -= 15
          socket.send(
            JSON.stringify({
              event: 'chat',
              data: JSON.stringify({
                name: `${$clientStore.Name || $clientStore.name}`,
                content: 'left',
                timeStamp: new Date().getTime() / 1000,
                isHost: `${$roomStore.isHost}`,
              }),
            }),
          )
        } else if (e.key === 'ArrowRight') {
          avoider.x += 15
          console.log($clientStore, '이르무머임ㄴ')
          socket.send(
            JSON.stringify({
              event: 'chat',
              data: JSON.stringify({
                name: `${$clientStore.Name || $clientStore.name}`,
                content: 'right',
                timeStamp: new Date().getTime() / 1000,
                isHost: `${$roomStore.isHost}`,
              }),
            }),
          )
        }
      })
    }

    addButton.addEventListener('click', () => {
      const x = width / 2
      const y = 0
      const speed = Math.floor(Math.random() * 4) + 1
      attackerArray.push(new Attacker(x, y, speed, animals[Math.floor(Math.random() * 4)]))
    })
  }
  // export let copyElement
  // const copyCode = () => {
  //   copyElement.focus()
  //   copyElement.select()
  //   document.execCommand('copy')
  //   alert('Copy Success!')
  // }
</script>

{#if $roomStore.isHost}
  <div class="notion">
    <button on:click={gameGo}>start</button>
    <div class="add">추가</div>
  </div>
{/if}

<div class="game">
  <canvas
    width={Math.floor(innerWidth * 0.7)}
    height={innerHeight}
    style="background: url('./assets/images/background.svg');margin:0"
  />
  <div class="chatting-wrapper">
    <Chat />
  </div>
</div>

<style lang="scss">
  .notion {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    padding: 24px;
    .roomcode {
      width: 16px;
      height: 16px;
      opacity: 0;
    }
    button {
      box-shadow: 0px 4px 4px 0px #00000033;
      width: 48px;
      height: 48px;
      border-radius: 100%;
      background-color: white;
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:not(:last-child) {
        margin-bottom: 12px;
      }
    }
  }
  .game {
    display: flex;
    .chatting-wrapper {
      width: 31%;
    }
  }
</style>
