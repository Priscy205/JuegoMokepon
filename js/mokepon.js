//para la función iniciar juego
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
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
const contenedorAtaques = document.getElementById('tarjetas-ataque')    //en el video usa contenedorAtaques

let mokepones = []  //construcción de un arreglo
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputWooper
let inputPurrloin
let inputHorsea 
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
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
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
)

purrloin.ataques.push(
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'tierra 🌿', id: 'boton-tierra'},
)

horsea.ataques.push(
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
    { nombre: 'tierra 🌿', id: 'boton-tierra'},
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
    
    botonReiniciar.addEventListener('click', reiniciarJuego)//creando el escuchador de eventos (click, llamada a una función)
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none'//invisible la seccion seleccionar mascota
    sectionReiniciar.style.display = 'none'//invisible el botón reiniciar
    sectionSeleccionarAtaque.style.display = 'flex'

    if (inputWooper.checked){
        spanMascotaJugador.innerHTML = inputWooper.id
        mascotaJugador = inputWooper.id
    }else if(inputPurrloin.checked){
        spanMascotaJugador.innerHTML = inputPurrloin.id
        mascotaJugador = inputPurrloin.id
    }else if(inputHorsea.checked){
        spanMascotaJugador.innerHTML = inputHorsea.id
        mascotaJugador = inputHorsea.id
    }else{
        alert('Selecciona una mascota')
        location.reload()
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++){
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon = `
        <button id=${ataque.id} class="botonAtaque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById ('boton-fuego')
    botonAgua = document.getElementById ('boton-agua')
    botonTierra = document.getElementById ('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
    
}

function secuenciaAtaque(){
    botones.forEach((boton) =>{
        boton.addEventListener('click', (e) =>{
            if(e.target.textContent ==='fuego 🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                //boton.style.background = '#94B49F'
                boton.disabled = true
            } else if(e.target.textContent === 'agua 💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                //boton.style.background = '#94B49F'
                boton.disabled = true
            } else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                //boton.style.background = '#94B49F'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio (0, mokepones.length - 1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)

    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length == 5){
        resultadoDelCombate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function resultadoDelCombate (){

for (let index = 0; index < ataqueJugador.length; index++) {
    if(ataqueJugador[index] === ataqueEnemigo[index]){
        indexAmbosOponentes(index, index)
        crearMensaje("EMPATE")
    } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index]==='TIERRA'){
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    }else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index]==='FUEGO'){
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index]==='AGUA'){
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    }else{
        indexAmbosOponentes(index, index)
        crearMensaje("PERDISTE")
        victoriasEnemigo++
        spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
}    
    revisarVidas()
}
    
function revisarVidas(){
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("UPS! Hubo un empate")
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("¡FELICIDADES! Has ganado 🤩")
    }else{
        crearMensajeFinal("¡LO SENTIMOS! Has perdido 😢")
    }
}

function crearMensaje(resultadoAtaques){
    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultadoAtaques
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

//en el video usa resultadoFinal
function crearMensajeFinal(resultadoJuego){
    sectionReiniciar.style.display = 'flex'//Visible al botón reiniciar

    sectionMensajes.innerHTML = resultadoJuego
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min )
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener('load', iniciarJuego)

