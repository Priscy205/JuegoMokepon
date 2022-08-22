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

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let mokepones = []  //construcción de un arreglo
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputWooper
let inputPurrloin
let inputHorsea 
let mascotaJugador
let mascotaJugadorObjeto
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
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './mascotas/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 1000

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 300 / 550

mapa. width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre    //atributos
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 100
        this.alto = 108
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image ()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
    lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
    )
    }
}

let wooper = new Mokepon('Wooper','./mascotas/mokepon_wooper.png', 5, './mascotas/mokepon_wooper.png')
let purrloin = new Mokepon('Purrloin','./mascotas/mokepon_purrloin.png', 5, './mascotas/mokepon_purrloin.png')
let horsea = new Mokepon('Horsea','./mascotas/mokepon_horsea.png', 5, './mascotas/mokepon_horsea.png')

//let wooperEnemigo = new Mokepon('Wooper','./mascotas/mokepon_wooper.png', 5, './mascotas/mokepon_wooper.png')
//let purrloinEnemigo = new Mokepon('Purrloin','./mascotas/mokepon_purrloin.png', 5, './mascotas/mokepon_purrloin.png')
//let horseaEnemigo = new Mokepon('Horsea','./mascotas/mokepon_horsea.png', 5, './mascotas/mokepon_horsea.png')

const wooper_ataques = [
    { nombre: 'tierra 🌿', id: 'boton-tierra'},
    { nombre: 'tierra 🌿', id: 'boton-tierra'},
    { nombre: 'tierra 🌿', id: 'boton-tierra'},
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
] 

const purrloin_ataques = [
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'tierra 🌿', id: 'boton-tierra'},
]

const horsea_ataques = [
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'agua 💧', id: 'boton-agua'},
    { nombre: 'fuego 🔥', id: 'boton-fuego'},
    { nombre: 'tierra 🌿', id: 'boton-tierra'},
]

wooper.ataques.push(...wooper_ataques)
//wooperEnemigo.ataques.push(...wooper_ataques)

purrloin.ataques.push(...purrloin_ataques)
//purrloinEnemigo.ataques.push(...purrloin_ataques)

horsea.ataques.push(...horsea_ataques)
//horseaEnemigo.ataques.push(...horsea_ataques)

mokepones.push(wooper,purrloin,horsea)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

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

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function (res){
            //console.log(res)
            if (res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
    }

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none'//invisible la seccion seleccionar mascota
    sectionReiniciar.style.display = 'none'//invisible el botón reiniciar
    
    //sectionSeleccionarAtaque.style.display = 'flex'

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

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        mokepon: mascotaJugador
    })
    })
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

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
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

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    wooperEnemigo.pintarMokepon()
    purrloinEnemigo.pintarMokepon()
    horseaEnemigo.pintarMokepon()
    if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
        revisarColision(wooperEnemigo)
        revisarColision(purrloinEnemigo)
        revisarColision(horseaEnemigo)
    }
}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res){
          if (res.ok){
                res.json()
                    .then(function({enemigos}){
                        console.log (enemigos)
                        let mokeponEnemigo = null
                        enemigos.forEach(function (enemigo){
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if (mokeponNombre === "Wooper"){
                                mokeponEnemigo = new Mokepon('Wooper','./mascotas/mokepon_wooper.png', 5, './mascotas/mokepon_wooper.png')
                            }else if (mokeponNombre === "Purrloin"){
                                mokeponEnemigo = new Mokepon('Purrloin','./mascotas/mokepon_purrloin.png', 5, './mascotas/mokepon_purrloin.png')
                            }else if (mokeponNombre === "Horsea"){
                                mokeponEnemigo = new Mokepon('Horsea','./mascotas/mokepon_horsea.png', 5, './mascotas/mokepon_horsea.png')
                            }

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            mokeponEnemigo.pintarMokepon()
                        })
                    })
            }
        })
    
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++){
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }        
    }
}

function revisarColision(enemigo){
const arribaEnemigo = enemigo.y
const abajoEnemigo = enemigo.y + enemigo.alto
const derechaEnemigo = enemigo.x + enemigo.ancho
const izquierdaEnemigo = enemigo.x

const arribaMascota =mascotaJugadorObjeto.y
const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
const izquierdaMascota = mascotaJugadorObjeto.x

    if(abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)

