let character = document.getElementsByClassName("select-character")[0]

character.addEventListener('change', () =>{
    // const bBranca = document.getElementsByClassName('bio')[0]
    // const bNegra = document.getElementsByClassName('bio')[1]
    // const bigMom = document.getElementsByClassName('bio')[2]
    // const kaido = document.getElementsByClassName('bio')[3]
    // const shanks = document.getElementsByClassName('bio')[4]

    for (let i = 0; i < 5; i++) {
        if (character.value == i) {
            character.classList = "select-character "
            character.classList += document.getElementsByTagName('option')[i].classList[0]
            document.getElementsByClassName('bio')[i].style.display = "block"
        }else{
            document.getElementsByClassName('bio')[i].style.display = "none"
        }
    }

})
