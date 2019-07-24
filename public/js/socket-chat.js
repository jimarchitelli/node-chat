var socket = io();

var params = new URLSearchParams( window.location.search);

if (!params.get('nombre') || !params.get('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre de usuario y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('crearMensaje', function(mensaje) {
    console.log(mensaje);
});

// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('listaPersonas', function(personas) {
    console.log(personas);
});

//Mensajes privados
socket.on('mensajePrivado', (mensaje) => {
    console.log(mensaje);
});