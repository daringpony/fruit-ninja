const gameArena = document.getElementById("gameArena")
let score = 0

const FruitImages = [
  "apple.png",
  "orange.png",
  "banana.png",
  "watermelon.png",
  "grapes.png",
  "bomb.png",
]
function getRandomPosition() {
  const x = Math.random() * (gameArena.clientWidth - 80)
  const y = 0
  return { x, y }
}

function createFruit() {
  const fruit = document.createElement("div")
  fruit.className = "fruit"
  const randomImage =
    FruitImages[Math.floor(Math.random() * FruitImages.length)]
  fruit.style.backgroundImage = `url('images/${randomImage}')`

  const { x, y } = getRandomPosition()
  fruit.style.left = x + "px"
  fruit.style.top = y + "px"
  gameArena.append(fruit)

  const fallInterval = setInterval(() => {
    const currentTop = parseInt(fruit.style.top)
    fruit.style.top = currentTop + 2 + "px"
    if (currentTop > gameArena.clientHeight) {
      clearInterval(fallInterval)
      fruit.remove()
    }
  }, 10)

  fruit.addEventListener("mousemove", () => {
    if (fruit.style.backgroundImage === 'url("images/bomb.png")') {
      gameOver()
    }
    clearInterval(fallInterval)
    fruit.style.transform = "scaleY(0)"
    fruit.style.opacity = "0"

    setTimeout(() => {
      const half1 = document.createElement("div")
      const half2 = document.createElement("div")

      half1.className = "fruit"
      half2.className = "fruit"

      half1.style.backgroundImage = `url('images/${randomImage}')`
      half2.style.backgroundImage = `url('images/${randomImage}')`

      half1.style.left = fruit.style.left
      half2.style.left = fruit.style.left

      half1.style.top = fruit.style.top
      half2.style.top = fruit.style.top

      half1.style.width = "40px"
      half2.style.width = "40px"

      half1.style.transform = "rotate(-20deg)"
      half2.style.transform = "rotate(20deg)"

      gameArena.append(half1)
      gameArena.append(half2)

      setTimeout(() => {
        half1.remove()
        half2.remove()
      }, 1000)
    }, 200)
    score += 1
    updateScore()
    console.log(score)

    if (score >= 10) {
      endGame()
    }
  })
  console.log(333)
}

setInterval(createFruit, 2000)
