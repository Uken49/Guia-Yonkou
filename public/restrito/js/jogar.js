// Inicio - Jogo
const player = document.querySelector("#luffy")
const fire = document.querySelector("#fireBall")

const btnPlay = document.querySelector("#play")
const btnRetry = document.querySelector("#retry")

const gameBoard = document.querySelector(".game-board")

const divPlay = document.getElementsByClassName("div-play")[0]
const divRetry = document.getElementsByClassName("div-play")[1]

// Pontos do game
let scorePoint = 0

btnPlay.addEventListener("click", playGame)

function playGame() {
    divPlay.style.display = "none"

    fire.classList.remove('fire-initial')
    fire.classList.add('fire')

    btnPlay.removeEventListener("click", playGame)
    btnRetry.addEventListener("click", playAgain)

    document.getElementsByTagName("body")[0].addEventListener("keydown", jump)
    scorePoint = 1
}

function playAgain() {
    document.location.reload()
}

function gameOver() {
    document.getElementsByTagName("body")[0].removeEventListener("keydown", jump)
    divRetry.style.display = "flex"
    scorePoint = 0

    if (scorePoint == 0) {
        clearInterval(loop)
        clearInterval(gameScore)
    }
}

function jump() {
    player.classList.add('luffy')
    setTimeout(() => {
        player.classList.remove('luffy')
    }, 1000);
}

// Calculando a posição do fogo e do luffy para encerrar o jogo
const loop = setInterval(() => {
    const firePosition = fire.offsetLeft
    const playerPosition = +window.getComputedStyle(player).bottom.replace('px', '')

    if (firePosition <= 65 && firePosition <= 80 && firePosition >= 20 && playerPosition <= 20) {
        fire.style.animation = "none"
        fire.style.left = `${firePosition}px`

        player.style.animation = "none"
        player.style.left = `${playerPosition}px`

        gameOver()
    }

}, 10);

// Pontuação do game
const gameScore = setInterval(() => {
    scorePoint++
    score.innerHTML = scorePoint
}, 100);

// Fim - Jogo
