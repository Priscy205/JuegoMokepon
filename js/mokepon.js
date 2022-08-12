let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

//Configuración de botones
function iniciarJuego(){
    //invisible la seccion de elegir ataque
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    //invisible el botón reiniciar
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById ('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    
    let botonAgua = document.getElementById ('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)

    let botonTierra = document.getElementById ('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    //seleccionando el ID
    let botonReiniciar = document.getElementById('boton-reiniciar')
    //creando el escuchador de eventos (click, llamada a una función)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    //invisible la seccion seleccionar mascota
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'

    //invisible el botón reiniciar
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'

    let inputWooper = document.getElementById('wooper')
    let inputPurrloin = document.getElementById('purrloin')
    let inputHorsea = document.getElementById('horsea')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

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

    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

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
    let sectionMensajes = document.getElementById('resultado')
    let ataquesDelJugador = document.getElementById('ataques-del-jugador')
    let ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

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
    //Visible al botón reiniciar
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'flex'

    let sectionMensajes = document.getElementById('resultado')

    sectionMensajes.innerHTML = resultadoJuego

    //Deshabilitar los botones
    let botonFuego = document.getElementById ('boton-fuego')
    botonFuego.disabled = true
    let botonAgua = document.getElementById ('boton-agua')
    botonAgua.disabled = true
    let botonTierra = document.getElementById ('boton-tierra')
    botonTierra.disabled = true
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min )
}

//esto estoy creando yo
function resultadoDelCombate (){
    //llamando las etiquetas span de vidas
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

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