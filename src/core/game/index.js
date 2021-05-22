export default function startGame() {
  const canvas = document.getElementById('main-canvas')
  const context = canvas.getContext('2d')
  const imgElem = new Image()

  imgElem.src = 'https://studiomeal.com/wp-content/themes/studiomeal/images/dot/sunface.png'
  imgElem.addEventListener('load', () => {
    // 이미지 로드 후, 캔버스에 그리기
    context.drawImage(imgElem, 20, 20)
  })
}
