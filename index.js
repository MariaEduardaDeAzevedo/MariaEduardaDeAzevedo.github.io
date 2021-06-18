function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function calculaIdade() {
    var data = new Date();
    var ano = data.getFullYear()
    var mes = data.getMonth()
    var dia = data.getDay()

    idade = `${ano - 2001} anos`

    if (mes == 8 && dia == 24) {
        idade = `${ano - 2001} anos [HOJE É MEU ANIVERSÁRIO]`
    } else if (mes < 8 || (mes == 8 && dia < 24)) {
        idade = `${ano - 1 - 2001} anos`
    }

    return idade;
}

async function onLoad() {
    
    github()

    var idade = document.getElementById("idade")
    idade.innerHTML = `${calculaIdade()}`

    var campo = document.getElementById("campo")
    var texto1 = "Maria Eduarda de Azevedo"
    var texto2 = "Duda."
    
    for (let index = 0; index < texto1.length; index++) {
        campo.innerHTML = campo.innerHTML + texto1[index]
        await sleep(200)
    }

    var tam = campo.innerHTML.length

    for (let index = 0; index < tam; index++) {
        console.log(campo.innerText.slice(0, campo.innerText.length - index))
        campo.innerHTML = campo.innerHTML.slice(0, campo.innerHTML.length - index)
        await sleep(200)
    }

    for (let index = 0; index < texto2.length; index++) {
        campo.innerText = campo.innerText + texto2[index]
        await sleep(200)
    }

}

async function github() {
  var urlPerfil = "https://api.github.com/users/MariaEduardaDeAzevedo"
  var urlRepos = "https://api.github.com/users/MariaEduardaDeAzevedo/repos"

  await fetch(urlPerfil).then( response => response.json()
  ).then( data => {

    var img = document.getElementById("icone-github")
    img.src = data.avatar_url

    var usuario = document.getElementById("usuario")
    usuario.innerHTML = data.login
    usuario.href = data.html_url
    usuario.title = "Ir para o perfil"

    var repositorios = document.getElementById("repositorios")
    repositorios.innerHTML = data.public_repos

    var seguidores = document.getElementById("seguidores")
    seguidores.innerHTML = data.followers

    var seguindo = document.getElementById("seguindo")
    seguindo.innerHTML = data.following
  })

  await fetch(urlRepos).then( response => response.json()
  ).then( data => {
        var est = 0    
        for (let index = 0; index < data.length; index++) {
            var obj = data[index]
            if (obj.fork == false) {
                est += obj.stargazers_count
            }
        }

        var estrelas = document.getElementById("estrelas")
        estrelas.innerHTML = est
  })
}
