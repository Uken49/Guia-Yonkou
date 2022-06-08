// Sessões
window.onload = validarSessao()

function validarSessao(){
    let email = sessionStorage.EMAIL_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;

    let span_user = document.getElementById("span_user");

    if (email != null && nome != null) {
        span_user.innerHTML = nome
    } else {
        limparSessao()
}
}

document.getElementById("logout").addEventListener('click', limparSessao)
function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// Função para detectar o local do menu que foi clicado
const list = document.querySelectorAll('.list')
function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'))
    this.classList.add('active')
}
list.forEach((item) =>
    item.addEventListener('click', activeLink))