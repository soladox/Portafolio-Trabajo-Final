window.addEventListener('DOMContentLoaded', (e) => {
    let boton = document.getElementById("btn-submit");
    boton.addEventListener("click", (ev) => {
        try {
            // recuperar los valores del formulario 
            let nombre  = document.getElementById("nombre").value;
            let email   = document.getElementById("correo").value;
            let select = document.getElementById("selectId").value; 
            let checkbox = document.querySelector(".flex").value;

            if( nombre.length < 5 ) {
                throw new Error("El nombre es demasiado corto!!!");
            }
            let completo  = getCompleto(); 
            let contacto = { 
                nombre_completo: nombre,
                email,
                completo,
                select, 
            };
            guardarContacto( contacto );
            
        } catch(err) { 
        }
    });    
});

function getCompleto() {
    let inputSeleccionado = document.querySelector("input[name='completo']:checked");
    if ( inputSeleccionado == null ) {
        throw new Error("Debe seleccionar un condimento!!!");
    }
    const completo = inputSeleccionado.value;
    return completo;
}


async function guardarContacto( contacto ) {
    const url = "https://diplomado-frontweb-default-rtdb.firebaseio.com/contact.json";
    const respuesta = await fetch(url, {
        method: "POST",
        body:   JSON.stringify(contacto) 
    });
    const data = await respuesta.json();
}
