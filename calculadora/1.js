
function calcularIdade() {
    let nasc = document.getElementById("anoNasc").value;
    let data = new Date().getFullYear();
    const idade = data - nasc;
    document.getElementById("msgresp").innerHTML = `A sua idade é de <strong> ${idade} </strong> anos.`
}

    function calcularIdade2() {
    let dia = document.getElementById("dia").value;
    let mes = document.getElementById("mes").value;
    let ano = document.getElementById("ano").value;
    let nasc2 = new Date(`${ano}/${mes}/${dia}`)
    let hoje = new Date();
    let idade2 = hoje.getFullYear()- nasc2.getFullYear()
    let aniv =  new Date(`${hoje.getFullYear()}/${mes}/${dia}`)
    
    if (aniv > hoje) {
        alert(idade2)
        idade2--
        alert(idade2)
    }

    document.getElementById("msgresp2").innerHTML = `A sua idade é de <strong> ${idade2} </strong> anos.`
}

function logar(){
    let user = document.getElementById("user").value
    let senha = document.getElementById("pass").value

    if (user === "" && senha === ""){
        window.open("user.html", "_Blank")
    }
    else if (user === "1" && senha === "1"){
        window.open("ong.html", "_Blank")
    }
    else{
        window.alert("Usuário ou senha incorretos")
    }

}


    