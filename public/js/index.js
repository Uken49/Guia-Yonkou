// Criando sessão para sumir com narrativa após primeira visualização
var body = document.getElementsByTagName("body")[0]

// Parte de narração
var cookie = localStorage.getItem("storyteller")
var inicio = document.getElementById('content_1')
var logoStory = document.getElementById('fig_logo')

// Parte "normal" do site
var header = document.getElementById("header")
var content2 = document.getElementById("content_2")

body.addEventListener('load', checkCookie)
inicio.addEventListener('click', toMenu)
var content1start = document.getElementById('art_storyteller')


function checkCookie() {
    // Verificando cookie
    if (cookie) {
        inicio.parentNode.removeChild(inicio)
        content1start.parentNode.removeChild(content1start)
        header.style.visibility = "visible"
        content2.style.visibility = "visible"

        header.style.opacity = "1"
        content2.style.opacity = "1"
    }
}

// INICIO - Primeiro conteúdo (Imagem e narração)

// Particulas utilizando a biblioteca: https://vincentgarreau.com/particles.js/
particlesJS.load('particles-container', 'particlesjs-config.json');

// Desaparencendo a imagem
function toMenu() {

    logoStory.style.opacity = "0"

    setTimeout(() => {
        if (logoStory.parentNode) {
            logoStory.parentNode.removeChild(logoStory);
            content1()
        }
    }, 2000);
}

// Aparecendo a tag que vai estar a narração
function content1() {
    content1start.style.display = "flex"
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
        // 'Lendas, lendas', 'Vagam pelo mar', 'Irão se assustar', 'Frente a um Yonkou',
        // 'Lendas, lendas', 'Sempre a navegar', 'Caso os encontrar', 'Saiba sua vida acabou',
        // 'Boatos sobre esses seres', 'Saiba se espalhou', 'Governando suas ilhas', 'São os...',
        'Yonkous']

    for (let i = 0; i < phrase.length; i++) {
        let seconds = i == 0 ? 0.3 : 2

        await timer(seconds);
        content1start.style.opacity = "1"
        storyteller.innerHTML = phrase[i]
        await timer(3);
        content1start.style.opacity = "0"
    }

    // Tirando conteúdo 1 e surgindo conteúdo 2
    setTimeout(() => {
        var header = document.getElementById("header")
        var content2 = document.getElementById("content_2")

        // Sumindo com a narração 
        inicio.style.opacity = "0"
        setTimeout(() => { inicio.parentNode.removeChild(inicio); }, 2000);

        // Aparecendo o site
        header.style.visibility = "visible"
        content2.style.visibility = "visible"

        header.style.opacity = "1"
        content2.style.opacity = "1"

        // Cria o cookie
        localStorage.setItem("storyteller", "1")

    }, 2000);

}

// FIM - Primeiro conteúdo (Imagem e narração)
