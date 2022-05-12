document.getElementsByTagName('body')[0].addEventListener('click', toMenu)

function toMenu(){
    let logo = document.getElementById('fig_inicio')

    logo.style.opacity = "0"

    setTimeout(() => {
        if (logo.parentNode) {
            logo.parentNode.removeChild(logo);
            content1()
        }
    }, 2000);
}

function content1() {
    let content = document.getElementById('content_1')

    content.style.display = "flex"

    setTimeout(() => {
        if (content.parentNode) {
            content.style.opacity = "1"
        }
    }, 2000);
}