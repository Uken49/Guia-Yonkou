// Sessões
// document.getElementsByTagName("body")[0].addEventListener('load', () => {
//     let email = sessionStorage.EMAIL_USUARIO;
//     let nome = sessionStorage.NOME_USUARIO;

//     let user_name = document.getElementById("user_name");

//     if (email != null && nome != null) {
//         user_name.innerHTML = nome
//     } else {
//         limparSessao()
//     }
// })

// document.getElementById("logout").addEventListener('click', limparSessao)
// function limparSessao() {
//     sessionStorage.clear();
//     window.location = "../login.html";
// }

// Função para detectar o local do menu que foi clicado
const list = document.querySelectorAll('.list')
function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'))
    this.classList.add('active')
}
list.forEach((item) =>
    item.addEventListener('click', activeLink))