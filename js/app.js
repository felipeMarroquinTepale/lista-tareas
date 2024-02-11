const formulario = document.querySelector('#formulario');

const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


eventListeners();

function eventListeners(){
    //cuando el usuario agregar un nuevo tweet
    formulario.addEventListener('submit',agregarTweet);

    //cunado el documento esta listo
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    });
}

function agregarTweet(e){
    e.preventDefault();
    //TextArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    //validacion
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio')
        return;
    }
    //Añadir al arreglo de tweets
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj ];

    //Una vez agregado vamos a crear html
    crearHTML()

    //Reiniciar el formulario
    formulario.reset();

}

//mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement ('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //elimina la alerta despues de 3 segundos
    setTimeout(()=>{
        mensajeError.remove();
    },3000);
}

//muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            //agregar boton eliminar
            const btnEliminar =  document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añadir funcion de elimnar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }


            //crar el html
            const li = document.createElement('li');
            //texto
            li.innerText = tweet.tweet;

            //asignar el boton
            li.appendChild(btnEliminar);

            //insertamos en el html
            listaTweets.appendChild(li);

        })
    }

    sincronizarStorage();
}
//eliminar tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}


//limpiar html
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));

}