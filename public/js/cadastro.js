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
// Checando se as duas senhas são iguais
const constPassConf = document.getElementById('inp_pass_conf')
constPassConf.addEventListener('keyup', valPass)
function valPass() {
    let pass = constPass.value
    let passConf = constPassConf.value
    if (passConf.length >= 6) {
        if (pass == passConf) {
            label_pass_conf.className = 'label-float valid'
            warning_pass_conf.innerHTML = ''
            return true
        } else {
            label_pass_conf.className = 'label-float invalid'
            warning_pass_conf.innerHTML = 'As senhas não conferem'
            return false
        }
    } else {
        label_pass_conf.className = 'label-float missing'
        warning_pass_conf.innerHTML = 'Senha com menos de 6 digitos'
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

// Validando nome
const constName = document.getElementById('inp_name')
constName.addEventListener('keyup', valName)
function valName() {
    let name = constName.value
    let regex = /^[a-z].* {1,}[a-z]{1,}/gi

    // Validando a quantidade de palavra e caracteres
    if (name == '') {
        label_name.className = 'label-float invalid'
        warning_name.innerHTML = 'Digite seu nome completo'
        return false
    }

    if (regex.test(name)) {
        warning_name.innerHTML = ''
        label_name.className = 'label-float valid'
        return true
    }else{
        label_name.className = 'label-float missing'
        warning_name.innerHTML = 'Digite seu nome completo'
        return false
    }
}

document.getElementById('btn_next').addEventListener('click', ()=> {
    if (!valName() | !valEmail() | !passCheck() | !valPass()) {
        return false
    }

    register()
    return true
})

// Enviando os dados para o banco
function register() {
    wait()

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    let nameUser = constName.value
    let email = constEmail.value
    let pass = constPass.value

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nameServer: nameUser,
            emailServer: email,
            passServer: pass
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            // Logando o usuário e mandando para o restrito/index
            sessionStorage.EMAIL_USUARIO = email;
            sessionStorage.NOME_USUARIO = nameUser;
            
            modalSucess()
            login(email, pass)
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        phrase = "Houve um erro ao tentar realizar o cadastro!"
        stopWait()
        modalErro(phrase)
    });

    return false;
}

function wait() {
    let loading = document.getElementById('loading_gif')
    loading.style.display = 'block'
}

function stopWait() {
    let loading = document.getElementById('loading_gif')
    loading.style.display = 'none'
}

function modalSucess() {
    let modal_message = document.getElementById('modal_message')
    let title = document.getElementById('title_message')
    let message = document.getElementById('message')
    let img = document.getElementById('modal_loading_gif')

    modal_message.style.opacity = "1"
    img.style.display = "block"
    title.innerHTML = "Cadastro realizado com sucesso"
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

function login(email, pass) {
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

                setTimeout(() => {
                    window.location = "restrito/index.html";
                }, 1000);
            });

        } else {
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
