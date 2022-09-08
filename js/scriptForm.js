window.addEventListener('DOMContentLoaded', (e) => {
    // con el evento DOMContentLoaded me aseguró que todas las etiquetas HTML 
    // fueron cargadas y procesadas por el browser 
    // más info en: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
    console.log("evento DOMContentLoaded");

    // Sintaxis de variables:
    // let nombreVariable = valor;
    // más ejemplos
    //let nombre = "Santiago";
    //let edad   = 34; 

    let boton = document.getElementById("btn-contact");
    boton.addEventListener("click", (ev) => {
        try {
            // recuperar los valores del formulario 
            let nombre  = document.getElementById("nombre").value;
            let email   = document.getElementById("correo").value;
            let checkbox = document.querySelector(".flex").value;
            let select = document.getElementById("selectId").value;
            if( nombre.length < 5 ) {
                throw new Error("El nombre es demasiado corto!!!");
            }
            let completo  = getCompleto(); 
            let contact = { // JSON =  JavaScript object notation 
                // clave: valor
                nombre_completo: nombre,  //nombre,
                email, // email: email,
                completo,
                contactar: select,
                venderInfo: checkbox,
                fecha_registro: (new Date()).toISOString() 
            };        
            console.dir(contact);
            guardarContacto( contact );
            mostrarExito("Se guardó correctamente su subscripción!!!");
        } catch(err) { 
            mostrarError(err.message); 
        }
    });    
});
function mostrarExito(mensaje) {
    // aparezca cuadro verder y
    // se muestre el mensaje 
    alert(mensaje);
    // TODO: hacer que el mensaje se muestre en el cuadro verde 
}

async function guardarContacto( contact ) {

    const url = "https://diplomado-frontweb-default-rtdb.firebaseio.com/contacto.json";
    const respuesta = await fetch(url, {
        method: "POST",
        body:   JSON.stringify(contact) 
    });
    const data = await respuesta.json();
    mostrarExito("Se guardó correctamente su subscripción con ID: "+data.name); 
}


function getCompleto() {
    let inputSeleccionado = document.querySelector("input[name='completo']:checked");
    if ( inputSeleccionado == null ) {
        throw new Error("Debe seleccionar un género!!!");
    }
    const completo = inputSeleccionado.value;
    return completo;
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