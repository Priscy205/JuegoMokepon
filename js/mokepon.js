//para la función iniciar juego
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')//invisible la seccion de elegir ataque
const sectionReiniciar = document.getElementById('reiniciar')//invisible el botón reiniciar
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonFuego = document.getElementById ('boton-fuego')
const botonAgua = document.getElementById ('boton-agua')
const botonTierra = document.getElementById ('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')

//para la función seleccionarMascotaJugador
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

//para la funcion seleccionarMascotaEnemigo
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

//para la funcion resultadoDelCombate
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

//para la funcion de crearMensaje
const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')

let mokepones = []  //construcción de un arreglo
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let inputWooper
let inputPurrloin
let inputHorsea 
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let wooper = new Mokepon('Wooper','./mascotas/mokepon_wooper.png', 5)
let purrloin = new Mokepon('Purrloin','./mascotas/mokepon_purrloin.png', 5)
let horsea = new Mokepon('Horsea','./mascotas/mokepon_horsea.png', 5)

wooper.ataques.push(
    { nombre: 'tierra 🌿', id: 'boton-tierra'},
    { nombre: 'tierra 🌿', id: 'boton-tierra'},
    { nombre: 'tierra 🌿', id: 'boton-tierra'},
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'fuego 🔥', id: 'boton-fuego'}
)

purrloin.ataques.push(
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'tierra 🌿', id: 'boton-tierra'}
)

horsea.ataques.push(
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
    { nombre: 'tierra 🌿', id: 'boton-tierra'}
)

mokepones.push(wooper,purrloin,horsea)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label id="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

        inputWooper = document.getElementById('Wooper')
        inputPurrloin = document.getElementById('Purrloin')
        inputHorsea = document.getElementById('Horsea')

    })

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

//en el video usa resultadoFinal
function crearMensajeFinal(resultadoJuego){
    sectionReiniciar.style.display = 'flex'//Visible al botón reiniciar

    sectionMensajes.innerHTML = resultadoJuego
    
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true//Deshabilitar los botones
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