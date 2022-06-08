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

    registerPoint(scorePoint)
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


// Inicio - Gráfico
let proximaAtualizacao;

window.onload = obterDadosGrafico(sessionStorage.ID_USUARIO);

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function obterDadosGrafico(idUsuario) {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página
function plotarGrafico(resposta) {
    console.log('iniciando plotagem do gráfico...');

    const dados = {
        labels: [],
        datasets: [
            {
                yAxisID: 'y-pontuacao',
                label: 'Pontuação',
                borderColor: '#32B9CD',
                backgroundColor: '#32b9cd8f',
                fill: true,
                data: []
            }
        ], scales: {
            indexAxis: {
                beginAtZero: true
            },
            x: {
                max: 16,
                min: 0,
                ticks: {
                    stepSize: 1
                }
            },
            y: {
                max: 5,
                min: 0,
                ticks: {
                    stepSize: 1
                }
            }
        },
        indexAxis: 'y'
    };

    for (i = 0; i < resposta.length; i++) {
        let registro = resposta[i];
        dados.labels.push(registro.nomeUsuario);
        dados.datasets[0].data.push(registro.pontuacao);
    }

    console.log(JSON.stringify(dados));

    const ctx = canvas_grafico.getContext('2d');
    window.grafico_barra = Chart.Bar(ctx, {
        type: 'horizontalBar',
        data: dados,
        options: {
            indexAxis: 'y',
            responsive: true,
            animation: { duration: 500 },
            hoverMode: 'index',
            stacked: false,
            title: {
                display: false,
                text: 'Dados capturados'
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: false,
                    position: 'right',
                    id: 'y-pontuacao',
                    ticks: {
                        beginAtZero: true,
                        max: 500,
                        min: 0
                    },
                    gridLines: {
                        drawOnChartArea: false,
                    },
                    indexAxis: {
                        beginAtZero: true
                    },
                    x: {
                        max: 16,
                        min: 0,
                        ticks: {
                            stepSize: 1
                        }
                    },
                    y: {
                        max: 5,
                        min: 0,
                        ticks: {
                            stepSize: 1
                        }
                    },
                    indexAxis: 'y'
                }]
            }
        }
    });
}

// Fim - Gráfico


// Inicio - Registrar pontuação no banco

function registerPoint(scorePoint){
    //Recupere o valor da nova input pelo nome do id
    //Agora vá para o método fetch logo abaixo
    const score = scorePoint
    const idUsuario = sessionStorage.ID_USUARIO

    // Enviando o valor da nova input
    fetch("/usuarios/pontuar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            scoreServer: score,
            idUsuarioServer: idUsuario
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log('Pontuação registrada =)')
        } else {
            throw ("Houve um erro ao tentar realizar o registro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

// Fim - Registrar pontuação no banco