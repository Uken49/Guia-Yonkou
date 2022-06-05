let character = document.getElementsByClassName("select-character")[0]

character.addEventListener('change', () =>{
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
