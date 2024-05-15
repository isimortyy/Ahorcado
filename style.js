const palabras = {
    programacion: ["computadora", "programacion", "desarrollo", "internet", "aplicacion", "telefono",
        "tecnologia", "informatica", "software", "hardware", "basededatos", "seguridad", "sistemaoperativo",
        "programador", "redessociales", "paginaweb", "navegador", "archivo", "almacenamiento", "dispositivo"],
    animales: ["perro", "gato", "elefante", "leon", "tigre", "jirafa", "lobo", "tortuga", "rinoceronte",
        "ciervo", "mono", "zorro", "serpiente", "cebra", "hipopotamo", "cocodrilo", "avispa", "araña", "aguila",
        "pinguino"],
    frutas: ["manzana", "platano", "fresa", "uva", "sandia", "naranja", "pera", "limon", "kiwi", "melocoton",
        "mango", "cereza", "papaya", "ciruela", "mandarina", "granada", "higo", "piña", "maracuya", "guayaba"]
};



let palabraElegida;
let palabraAdivinada;
let intentosRestantes;

// Función para mostrar la ventana de selección de tema
function mostrarVentanaTema() {
    // Oculta el título y el botón de jugar
    document.getElementById('titulo').style.display = 'none';
/*     document.getElementById('btn-jugar').style.display = 'none';
 */
    // Muestra la ventana de selección de tema
    document.getElementById('ventana-tema').style.display = 'block';

    // Oculta las opciones de dificultad y el contenedor del juego
    document.getElementById('opciones-dificultad').style.display = 'none';
    document.getElementById('contenedor-juego').style.display = 'none';
}

// Función para mostrar las opciones de dificultad después de seleccionar un tema
function mostrarDificultades(tema) {
    // Oculta el título y el botón de jugar
    document.getElementById('titulo').style.display = 'none';
   /*  document.getElementById('btn-jugar').style.display = 'none'; */

    // Muestra las opciones de dificultad
    document.getElementById('opciones-dificultad').style.display = 'block';



    // Oculta la ventana de selección de tema
    document.getElementById('ventana-tema').style.display = 'none';

    // Oculta el contenedor del juego
    document.getElementById('contenedor-juego').style.display = 'none';

    const centrar= document.getElementById('contenedor-juego')
    centrar.style.display="grid"
    centrar.style.aplace="center"
    

    // Selecciona las palabras según el tema elegido
    let palabrasTema = palabras[tema];
    cargarJuego(palabrasTema);
    cambiarDificultad();
}

// Función para redirigir a la página de selección de dificultad
function cambiarDificultad() {
    // Oculta el título y el botón de jugar
    document.getElementById('titulo').style.display = 'none';
    /* document.getElementById('btn-jugar').style.display = 'none'; */

    // Muestra las opciones de dificultad
    document.getElementById('opciones-dificultad').style.display = 'block';

    // Oculta la ventana de selección de tema
    document.getElementById('ventana-tema').style.display = 'none';

    // Oculta el contenedor del juego
    document.getElementById('contenedor-juego').style.display = 'none';
}

// Función para redirigir a la ventana de selección de tema desde la página de dificultades
function cambiarTema() {
    // Oculta las opciones de dificultad
    document.getElementById('opciones-dificultad').style.display = 'none';

    // Muestra la ventana de selección de tema
    document.getElementById('ventana-tema').style.display = 'block';

    // Muestra el título y el botón de jugar
    document.getElementById('titulo').style.display = 'none';
/*     document.getElementById('btn-jugar').style.display = 'none';
 */
    // Oculta el contenedor del juego
    document.getElementById('contenedor-juego').style.display = 'none';
}

// Función para ocultar el título y el botón de jugar
function ocultarTituloYBoton() {
    document.getElementById('titulo').style.display = 'none';
}

// Función para mostrar el título y el botón de jugar
function mostrarTituloYBoton() {
    document.getElementById('titulo').style.display = 'none';
}

// Función para cargar el juego con una dificultad específica
function cargarJuego(dificultad) {
    document.getElementById('opciones-dificultad').style.display = 'none';
    document.getElementById('contenedor-juego').style.display = 'block' 

    const elemento= document.getElementById('contenedor-juego')
    elemento.style.display="flex"
    elemento.style.gap="30px"
   

    document.getElementById('titulo').style.display = 'none';
    /* document.getElementById('btn-jugar').style.display = 'none'; */
    if (!palabraElegida) {
        iniciarJuego(dificultad);
    } else {
        // Solo actualiza los intentos restantes
        if (dificultad === "facil") {
            intentosRestantes = 10;
        } else if (dificultad === "medio") {
            intentosRestantes = 7;
        } else if (dificultad === "dificil") {
            intentosRestantes = 5;
        }
        actualizarMostrar();
    }
}

// Función para actualizar la visualización de la palabra a adivinar y los espacios
function actualizarMostrar() {
    const mostrarPalabra = document.getElementById("mostrar-palabra");
    const espaciosPalabra = document.getElementById("espacios-palabra");
    mostrarPalabra.innerHTML = '';
    espaciosPalabra.innerHTML = '';
    for (let i = 0; i < palabraAdivinada.length; i++) {
        const spanPalabra = document.createElement('span');
        spanPalabra.textContent = palabraAdivinada[i];
        mostrarPalabra.appendChild(spanPalabra);
        if (i < palabraAdivinada.length - 1) {
            const spanEspacio = document.createElement('span');
            espaciosPalabra.appendChild(spanEspacio);
        }
    }
    document.getElementById("intentos-restantes").textContent = intentosRestantes;
}

// Función para generar el teclado de letras
function generarTeclado() {
    const contenedorTeclado = document.getElementById("teclado");
    contenedorTeclado.innerHTML = '';
    for (let i = 0; i < 26; i++) {
        const letra = String.fromCharCode(97 + i); // Código ASCII para letras minúsculas
        const boton = document.createElement('button');
        boton.textContent = letra.toUpperCase(); // Convertir a mayúsculas para la visualización
        boton.addEventListener('click', () => {
            comprobarLetra(letra);
            boton.disabled = true; // Deshabilitar botón después de hacer clic
        });
        contenedorTeclado.appendChild(boton);
    }
}

// Función para comprobar si la letra seleccionada está en la palabra a adivinar
function comprobarLetra(letra) {
    let encontrada = false;
    for (let i = 0; i < palabraElegida.length; i++) {
        if (palabraElegida[i] === letra) {
            palabraAdivinada = palabraAdivinada.substring(0, i) + letra + palabraAdivinada.substring(i + 1);
            encontrada = true;
        }
    }
    if (!encontrada) {
        intentosRestantes--;
        actualizarImagenAhorcado(intentosRestantes); // Actualizar la imagen del ahorcado
    }
    actualizarMostrar();
    comprobarGanar();
}

// Función para actualizar la imagen del ahorcado dependiendo del número de intentos restantes
function actualizarImagenAhorcado(intentosRestantes) {
    const imagenAhorcado = document.getElementById("imagen_ahorcado");
    imagenAhorcado.src = `img/ahorcado${10 - intentosRestantes}.jpg`;
}

// Función para comprobar si se ha ganado el juego
function comprobarGanar() {
    if (palabraAdivinada === palabraElegida) {
        alert("¡Ganaste!");
        reiniciarJuego(); // Solo reiniciar juego si se ha ganado
    } else if (intentosRestantes === 0) {
        alert("¡Perdiste! La palabra era: " + palabraElegida);
        reiniciarJuego(); // Solo reiniciar juego si se ha perdido
    }
}

// Función para iniciar el juego con una dificultad específica
function iniciarJuego(palabrasTema) {
    palabraElegida = palabrasTema[Math.floor(Math.random() * palabrasTema.length)];
    palabraAdivinada = "_".repeat(palabraElegida.length);
    intentosRestantes = 10; // Cambia esta cantidad según la dificultad
    actualizarMostrar();
    generarTeclado();

}

// Función para reiniciar el juego
function reiniciarJuego() {
    palabraElegida = null;
    palabraAdivinada = null;
    intentosRestantes = null;
  
    // Limpiar contenedores de palabra y teclado
    document.getElementById('mostrar-palabra').innerHTML = '';
    document.getElementById('espacios-palabra').innerHTML = '';
    document.getElementById('teclado').innerHTML = '';
  
    // Limpiar otros elementos
    document.getElementById('intentos-restantes').textContent = '';
  
    // Restablecer la imagen del ahorcado a la inicial
    const imagenAhorcado = document.getElementById("imagen_ahorcado");
    imagenAhorcado.src = "img/ahorcado0.jpg";
  
    // Mostrar opciones de dificultad y ocultar contenedor del juego
    document.getElementById('contenedor-juego').style.display = 'none';

    window.location.href = "index.html"; // Reemplazar "index.html" por la URL de la página principal
}


function cerrarVentanaTema() {
    window.location.reload(); // Recarga la página
}

//Necesito un favorzote y es que cada vez que se oprima una letra que no sea la correcta salga una imagen, teniendo en cuenta el numero de intentos porque ya sabes que hay tres niveles que son fácil, medio y difícil estas son algunas de las que tengo mientras utiliza esas y yo le agrego el resto ahorcado0.jpg, ahorcado1.jpg, ahorcado2.jpg, ahorcado3.jpg, ahorcado4.jpg//