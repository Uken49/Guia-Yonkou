// Função para exibir/esconder a senha
const eye = document.getElementById('eye_pass')
eye.addEventListener("click", () => {
    let pass = constPass.value

    if (pass.type == 'password') {
        eye.src = 'img/sistema/svg/eye_open.svg'
        pass.type = 'text'
    } else {
        pass.type = 'password'
        eye.src = 'img/sistema/svg/eye_closed.svg'
    }
})

// Checando se a senha é válida
const constPass = document.getElementById('inp_pass')
constPass.addEventListener('keyup', passCheck)
function passCheck() {
    let pass = constPass.value
    let regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/

    // Verificando se a senha é forte com regex
    if (pass == '') {
        warning_pass.innerHTML = 'Digite uma senha'
        label_pass.className = 'label-float invalid'
        return false
    }

    if (regex.test(pass)) {
        warning_pass.innerHTML = ''
        label_pass.className = 'label-float valid'
        return true
    } else {
        label_pass.className = 'label-float missing'
        warning_pass.innerHTML = 'Use oito ou mais caracteres com uma combinação de letras, números e símbolos: @ ! # $ % ^ & * ( ) / e \\'
        return false
    }
}

// Validando email
const constEmail = document.getElementById('inp_email')
constEmail.addEventListener('keyup', valEmail)
function valEmail() {
    let email = constEmail.value
    let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    // Essa expressão não garante a veracidade 100% de um email, para ser 100% precisa mandar confirmação por email

    // Validando email se os caracteres do email é válido
    if (email == '') {
        label_email.className = 'label-float invalid'
        warning_email.innerHTML = 'Digite um email válido'
        return false
    }

    if (regex.test(email)) {
        warning_email.innerHTML = ''
        label_email.className = 'label-float valid'
        return true
    } else {
        label_email.className = 'label-float missing'
        warning_email.innerHTML = 'Digite um email válido'
        return false
    }
}

// Chamando a função login quando clicar no botão de login
const btn = document.getElementById('btn_login')
btn.addEventListener("click", login)

// Validando a entrada do usuário
function login() {
    wait()

    let pass = constPass.value
    let email = constEmail.value

    if (!valEmail() | !passCheck()) {
        phrase = "Preencha todos os campos corretamente"
        stopWait()
        modalErro(phrase)
        return false
    }

    console.log("FORM LOGIN: ", email);
    console.log("FORM SENHA: ", pass);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            passServer: pass
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO login()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nomeUsuario;

                modalSucess()
                setTimeout(() => {
                    window.location = "restrito/index.html";
                }, 1000);
            });

        } else {
            console.log("Houve um erro ao tentar realizar o login!");
            phrase = "Email ou senha inválidos"
            modalErro(phrase)

            label_email.className = 'label-float missing'
            label_pass.className = 'label-float missing'

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
        phrase = "Erro ao realizar o login"
        stopWait()
        modalErro(phrase)
    })

    return false;
}

function wait() {
    let loading = document.getElementById('loading_gif')
    btn.style.display = 'none'
    loading.style.display = 'block'
}

function stopWait() {
    let loading = document.getElementById('loading_gif')
    loading.style.display = 'none'
    btn.style.display = 'block'
}

function modalSucess() {
    let modal_message = document.getElementById('modal_message')
    let title = document.getElementById('title_message')
    let message = document.getElementById('message')
    let img = document.getElementById('modal_loading_gif')

    modal_message.style.opacity = "1"
    img.style.display = "block"
    title.innerHTML = "Login realizado com sucesso"
    message.innerHTML = "Redirecionando"

    setTimeout(() => {
        modal_message.style.opacity = "0"
    }, 2000);
}

function modalErro(phrase) {
    let modal_message = document.getElementById('modal_message')
    let title = document.getElementById('title_message')
    let message = document.getElementById('message')
    let img = document.getElementById('modal_loading_gif')

    modal_message.style.opacity = "1"
    img.style.display = "none"
    title.innerHTML = phrase
    message.innerHTML = ""

    setTimeout(() => {
        modal_message.style.opacity = "0"
    }, 2000);
}