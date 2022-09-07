window.addEventListener('DOMContentLoaded', (e) => {
    let boton = document.getElementById("btn-submit");
    boton.addEventListener("click", (ev) => {
        try {
            // recuperar los valores del formulario 
            let nombre  = document.getElementById("nombre").value;
            let email   = document.getElementById("correo").value;
            if( nombre.length < 5 ) {
                throw new Error("El nombre es demasiado corto!!!");
            }
            let genero  = getGenero(); 
            let intereses = getIntereses();
            let subscriptor = { 
                nombre_completo: nombre,
                email,
                genero,
                intereses,
                fecha_registro: (new Date()).toISOString() 
            };
            guardarSubscriptor( subscriptor );
            mostrarExito("Se guardó correctamente su subscripción!!!");
        } catch(err) { 
            mostrarError(err.message); 
        }
    });    
});
function mostrarExito(mensaje) {
    alert(mensaje);
}

async function guardarSubscriptor( subscriptor ) {
    const url = "https://diplomado-frontweb-default-rtdb.firebaseio.com/contact.json";
    // alternativas:
    // 1) Callbacks     
    /*
    fetch(url, {
        method: "POST",
        body:   JSON.stringify(subscriptor) 
    })
        .then( respuesta => respuesta.json() ) // devuelve una Promesa 
        .then( data => mostrarExito("Se guardó correctamente su subscripción") )
    ;
    */

    // 2) Async Await 
    const respuesta = await fetch(url, {
        method: "POST",
        body:   JSON.stringify(subscriptor) 
    });
    const data = await respuesta.json();
    mostrarExito("Se guardó correctamente su subscripción con ID: "+data.name); 
}

function getIntereses() {
    let inputIntereses  = document.querySelectorAll("input[name='intereses']:checked");
    let arrIntereses    = []; 
    
    // alternativa 1:
    //inputIntereses.forEach( nodoInteres => arrIntereses.push(nodoInteres.value) );
    
    // alternativa 2:
    for( let i = 0; i < inputIntereses.length; i++ ) {
        const interes = inputIntereses[i].value;
        arrIntereses.push(interes);
    }

    if( inputIntereses.length < 1 ) {
        throw new Error("Debe seleccionar al menos 1 tema de su interés!!!");
    }
    return arrIntereses; 
}
function getGenero() {
    let inputSeleccionado = document.querySelector("input[name='genero']:checked");
    if ( inputSeleccionado == null ) {
        throw new Error("Debe seleccionar un género!!!");
    }
    const genero = inputSeleccionado.value;
    return genero;
}

function mostrarError(mensajeDeError) {
    // valor anterior "none"    
    document.getElementById("form-mensaje-error").style.display = "block";
    const ul = document.querySelector("#form-mensaje-error ul");
    const li = document.createElement("li");
    const liText = document.createTextNode(mensajeDeError);
    li.appendChild(liText); 
    ul.appendChild(li); 
}