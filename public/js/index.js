document.getElementsByTagName('body')[0].addEventListener('click', toMenu)
var content = document.getElementById('content_1')

// INICIO - Primeiro conteúdo (Imagem e narração)

// Particulas utilizando a biblioteca: https://vincentgarreau.com/particles.js/
particlesJS.load('particles-container', 'particlesjs-config.json');

// Desaparencendo a imagem
function toMenu() {
    let logo = document.getElementById('fig_inicio')

    logo.style.opacity = "0"

    setTimeout(() => {
        if (logo.parentNode) {
            logo.parentNode.removeChild(logo);
            content1()
        }
    }, 2000);
}

// Aparecendo a tag que vai estar a narração
function content1() {
    content.style.display = "flex"
    narrative()
}

// Criando delay pra narração
const timer = (seconds) => {
    let time = seconds * 1000
    return new Promise(res => setTimeout(res, time))
}

// Exibindo a narração
async function narrative() {
    let storyteller = document.getElementById('span_storyteller')
    let phrase = ['Lendas, lendas', 'Vagam pelo mar', 'Irão se assustar', 'Frente a um Yonkou',
        'Lendas, lendas', 'Sempre a navegar', 'Caso os encontrar', 'Saiba sua vida acabou',
        'Boatos sobre esses seres', 'Saiba se espalhou', 'Governando suas ilhas', 'São os',
        'Yonkous']

    for (let i = 0; i < phrase.length; i++) {
        let seconds = i == 0 ? 0.3 : 2

        await timer(seconds);
        content.style.opacity = "1"
        storyteller.innerHTML = phrase[i]
        await timer(3);
        content.style.opacity = "0"
    }

    //Próximo passo a fazer
}

// FIM - Primeiro conteúdo (Imagem e narração)
