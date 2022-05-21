var body = document.getElementsByTagName('body')[0]
body.addEventListener('click', toMenu)
var content_1 = document.getElementById('content_1')

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
    content_1.style.display = "flex"
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
    let phrase = [
        'Lendas, lendas', 'Vagam pelo mar', 'Irão se assustar', 'Frente a um Yonkou',
        'Lendas, lendas', 'Sempre a navegar', 'Caso os encontrar', 'Saiba sua vida acabou',
        'Boatos sobre esses seres', 'Saiba se espalhou', 'Governando suas ilhas', 'São os...',
        'Yonkous']

    for (let i = 0; i < phrase.length; i++) {
        let seconds = i == 0 ? 0.3 : 2

        await timer(seconds);
        content_1.style.opacity = "1"
        storyteller.innerHTML = phrase[i]
        await timer(3);
        content_1.style.opacity = "0"
    }

    // Tirando conteúdo 1 e surgindo conteúdo 2
    setTimeout(() => {
        let header = document.getElementById("header")
        let content2 = document.getElementById("content_2")

        // Sumindo com a narração 
        setTimeout(() => {
            content_1.style.opacity = "0"
        }, 500);
        content_1.style.visibility = "hidden"

        // Aparecendo o site
        body.style.backgroundColor = "#fff"

        header.style.visibility = "visible"
        content2.style.visibility = "visible"

        header.style.opacity = "1"
        content2.style.opacity = "1"
    }, 2000);

}

// FIM - Primeiro conteúdo (Imagem e narração)
