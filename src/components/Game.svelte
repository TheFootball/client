<script>
  import { tick } from 'svelte'
  import { clientStore } from '~/stores/client'
  import { roomStore } from '~/stores/room'
  import { chatStore } from '~/stores/chat'

  export let socket
  export let isGameStart

  const startGame = () => {
    if (!isGameStart) {
      isGameStart = true
      socket.command('start')
    }
  }

  $: {
    if (isGameStart) {
      gameGo()
    }
  }

  const gameGo = async () => {
    await tick()
    const canvas = document.querySelector('canvas')
    const width = Math.floor(innerWidth * 0.7)
    const height = innerHeight

    canvas.width = width
    canvas.height = height

    const avoiderTick = Math.floor(width / 30)
    const attackerTick = height / (30 * 60)

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
        context.drawImage(this.img, this.x, this.y, width / 10, height / 10)
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
        context.drawImage(avoiderImage, this.x, this.y, width / 20, height / 5)
      }
    }

    let frameId = 0

    let avoider = ''

    const makeAttacker = (name) => {
      const x = width / 2
      const y = 0
      const speed = Math.floor(Math.random() * 4) + 1
      // 이것도 일관되긴 해야함
      attackerArray.push(new Attacker(x, y, speed, animals[0], name))
    }

    const moveAttacker = (direction, name) => {
      const offset = width / 30
      const selectedAttacker = attackerArray.find((attacker) => attacker.id === name)
      if (selectedAttacker) {
        selectedAttacker.x += direction === 'L' ? -offset : offset
      }
    }

    // 소켓
    function render() {
      frameId = requestAnimationFrame(render)
      context.clearRect(0, 0, canvas.width, canvas.height)
      avoider.draw()

      let attacker
      for (let i = 0; i < attackerArray.length; i++) {
        attacker = attackerArray[i]
        if (attacker.y > height) {
          attackerArray.splice(i, 1)
          continue
        } else {
          attacker.y += attackerTick
          attacker.draw()
        }

        // 자신의 캐릭터일때 반짝반짝 넣기

        // 충돌 계산
        const dist = Math.hypot(avoider.x - attacker.x, avoider.y - attacker.y)

        // 충돌 계산값에 따른 게임 끝 => 이것도 상대적으로 계산되어야함
        if (dist - 35 < 1) {
          console.log('게임끝')
          cancelAnimationFrame(frameId)
        }
      }

      $chatStore.forEach((chat) => {
        // TODO: 방 정보 식별
        const isUnprocessedHostChatting = chat.isProcessed === undefined && chat.sender === $roomStore.host

        if (chat.isProcessed === undefined) {
          if (chat.message === 'Host Goes Left') {
            avoider.x -= avoiderTick
          } else if (chat.message === 'Host Goes Right') {
            avoider.x += avoiderTick
          }
        }

        // TODO: 방 정보 식별
        const isUnprocessedGuestChatting =
          chat.isProcessed === undefined && chat.sender !== 'server' && chat.sender !== $roomStore.host

        if (chat.isProcessed === undefined) {
          // 이미 만들어져있다면 L이랑 R만 돌아가야함
          switch (chat.message) {
            case 'S':
              makeAttacker($clientStore.name)
              break
            case 'L':
            case 'R':
              moveAttacker(chat.message, $clientStore.name)
              break
            default:
              break
          }
        }
        chat.isProcessed = true
      })
    }

    let urls = [
      './assets/images/dochi.svg',
      // './assets/images/sqrl.svg',
      // './assets/images/bird.svg',
      // './assets/images/dochi.svg',
      './assets/images/avoider.svg',
    ]

    let imageCount = 0

    // image loading
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

        if (imageCount === 2) {
          avoider = new Avoider(width / 2, height - height / 5, 100)
          render()
        }
      })
    })

    if ($roomStore.isHost) {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          socket.send('Host Goes Left')
        } else if (e.key === 'ArrowRight') {
          socket.send('Host Goes Right')
        }
      })
    }

    // 여기를 채팅 시작 첬을때 어태커 나오는거 시작
    // 메시지를 받아서 처리를 하는데, 처리를 했을 경우 isProcessed를 true로 해주자

    addButton.addEventListener('click', () => {})
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
    <button on:click={startGame}>start</button>
    <div class="add">추가</div>
  </div>
{/if}
<canvas width={Math.floor(innerWidth * 0.7)} height={innerHeight} style="background-color:#b9ea9d;margin:0" />

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
</style>
