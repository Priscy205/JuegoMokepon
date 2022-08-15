//para la función iniciar juego
let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')//invisible la seccion de elegir ataque
let sectionReiniciar = document.getElementById('reiniciar')//invisible el botón reiniciar
let botonMascotaJugador = document.getElementById('boton-mascota')
let botonFuego = document.getElementById ('boton-fuego')
let botonAgua = document.getElementById ('boton-agua')
let botonTierra = document.getElementById ('boton-tierra')
let botonReiniciar = document.getElementById('boton-reiniciar')

//para la función seleccionarMascotaJugador
let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
let inputWooper = document.getElementById('wooper')
let inputPurrloin = document.getElementById('purrloin')
let inputHorsea = document.getElementById('horsea')
let spanMascotaJugador = document.getElementById('mascota-jugador')

//para la funcion seleccionarMascotaEnemigo
let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

//para la funcion resultadoDelCombate
let spanVidasJugador = document.getElementById('vidas-jugador')
let spanVidasEnemigo = document.getElementById('vidas-enemigo')

//para la funcion de crearMensaje
let sectionMensajes = document.getElementById('resultado')
let ataquesDelJugador = document.getElementById('ataques-del-jugador')
let ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

//para la funcion crearMensajeFinal
//let sectionReiniciar = document.getElementById('reiniciar')
//let sectionMensajes = document.getElementById('resultado')


let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

//Configuración de botones
function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)//creando el escuchador de eventos (click, llamada a una función)
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none'//invisible la seccion seleccionar mascota
    sectionReiniciar.style.display = 'none'//invisible el botón reiniciar
    sectionSeleccionarAtaque.style.display = 'flex'

    if (inputWooper.checked){
        spanMascotaJugador.innerHTML = 'Wooper'
    }else if(inputPurrloin.checked){
        spanMascotaJugador.innerHTML = 'Purrloin'
    }else if(inputHorsea.checked){
        spanMascotaJugador.innerHTML = 'Horsea'
    }else{
        alert('Selecciona una mascota')
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio (1,3)

    if (mascotaAleatorio ==1){
        spanMascotaEnemigo.innerHTML = 'Wooper'
    }else if (mascotaAleatorio == 2){
        spanMascotaEnemigo.innerHTML = 'Purrloin'
    }else {
        spanMascotaEnemigo.innerHTML = 'Horsea'
    }
}

function ataqueFuego(){
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}

function ataqueAgua(){
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}

function ataqueTierra(){
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)

    if (ataqueAleatorio ==1){
        ataqueEnemigo = 'FUEGO'
    }else if (ataqueAleatorio == 2){
        ataqueEnemigo = 'AGUA'
    }else {
        ataqueEnemigo = 'TIERRA'
    }

    resultadoDelCombate()
}

function crearMensaje(resultadoAtaques){
    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultadoAtaques
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

//en el video usa resultado Final
function crearMensajeFinal(resultadoJuego){
    sectionReiniciar.style.display = 'flex'//Visible al botón reiniciar

    sectionMensajes.innerHTML = resultadoJuego

    //Deshabilitar los botones
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min )
}

//esto estoy creando yo
function resultadoDelCombate (){
    if (ataqueEnemigo == ataqueJugador){
        crearMensaje("EMPATE")
    }else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA' || ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO' || ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA'){
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    //revisando las vidas
    RevisarVidas()
}

function RevisarVidas(){
    if (vidasEnemigo == 0){
        crearMensajeFinal("¡FELICIDADES! Has ganado 🤩")
    }else if (vidasJugador == 0){
        crearMensajeFinal("¡LO SENTIMOS! Has perdido 😢")
    }
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener('load', iniciarJuego)