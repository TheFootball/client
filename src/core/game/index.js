export default function startGame(width, height) {
  const canvas = document.querySelector('canvas')
  canvas.width = width
  canvas.height = height
  let backgroundImg
  const context = canvas.getContext('2d')
  context.fillStyle = "url('')"
  const addButton = document.querySelector('.add')

  const attackerArray = []
  let angle = 0
  let animals = []

  class Attacker {
    constructor(x, y, speed, img) {
      this.x = x
      this.y = y
      this.speed = speed
      this.img = img
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
    constructor(x, y, speed) {
      this.x = x
      this.y = y
      this.speed = speed
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
        attacker.draw()
      }

      const dist = Math.hypot(avoider.x - attacker.x, avoider.y - attacker.y)

      if (dist - 50 < 1) {
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
        avoider = new Avoider(0, height - 200, 100)
        render()
      }
    })
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'l') {
      avoider.x -= 15
    } else if (e.key === 'r') {
      avoider.x += 15
    }
  })

  addButton.addEventListener('click', () => {
    const x = Math.random() * width
    const y = 0
    const speed = Math.floor(Math.random() * 4) + 1
    attackerArray.push(new Attacker(x, y, speed, animals[Math.floor(Math.random() * 4)]))
  })
}
