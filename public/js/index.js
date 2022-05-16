document.getElementsByTagName('body')[0].addEventListener('click', toMenu)
var content = document.getElementById('content_1')

// INICIO - Primeiro conteúdo (Imagem e narração)

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
    let phrase = [`Testando`, `Testando de novo`, `Demora né?`, `Legal essa fonte, né?`, `Estamos aqui à tanto tempo`
                    ,`Testando`, `Me prepare um café`, `Em breve...os Yonkous irão surgir`]

    for (let i = 0; i < phrase.length; i++) {
        let seconds = i == 0 ? 0.3 : 2

        await timer(seconds);
        content.style.opacity = "1"
        storyteller.innerHTML = phrase[i]
        await timer(4);
        content.style.opacity = "0"
    }

    //Próximo passo
}

// FIM - Primeiro conteúdo (Imagem e narração)
