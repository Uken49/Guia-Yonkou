// Criando sessão para sumir com narrativa após primeira visualização
var body = document.getElementsByTagName("body")[0]

// Parte de narração
var cookie = localStorage.getItem("storyteller")
var inicio = document.getElementById('content-1')
var logoStory = document.getElementById('fig-logo')

// Parte "normal" do site
var header = document.getElementById("header")
var footer = document.getElementById("footer")
var content2 = document.getElementById("content-2")

var content1start = document.getElementById('art-storyteller')


function checkCookie() {
    // Verificando cookie
    if (cookie) {
        inicio.style.transition = "0"

        inicio.parentNode.removeChild(inicio)
        content1start.parentNode.removeChild(content1start)
        return
    }
    inicio.addEventListener('click', toMenu)

    body.style.overflow = "hidden"
    header.style.visibility = "hidden"
    content2.style.visibility = "hidden"

    header.style.opacity = "0"
    content2.style.opacity = "0"

    setTimeout(() => {
        header.style.transition = "2s"
        content2.style.transition = "2s"
        footer.style.transition = "2s"
        body.style.transition = "2s"
    }, 2500);

    // Particulas utilizando a biblioteca: https://vincentgarreau.com/particles.js/
    particlesJS.load('particles-container', 'particlesjs-config.json');
}

// INICIO - Primeiro conteúdo (Imagem e narração)

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
    let storyteller = document.getElementById('span-storyteller')
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
        var content2 = document.getElementById("content-2")

        // Sumindo com a narração 
        inicio.style.opacity = "0"
        inicio.parentNode.removeChild(inicio)

        // Aparecendo o site
        body.style.overflow = "auto"
        header.style.visibility = "visible"
        content2.style.visibility = "visible"

        header.style.opacity = "1"
        content2.style.opacity = "1"

        setTimeout(() => {
            header.style.transition = "0"
            content2.style.transition = "0"
            footer.style.transition = "0"
            body.style.transition = "0"
        }, 2000);

        // Cria o cookie
        localStorage.setItem("storyteller", "1")
    }, 2000);

}

// FIM - Primeiro conteúdo (Imagem e narração)
