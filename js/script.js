window.addEventListener('DOMContentLoaded', (e) => {

    let boton = document.getElementById("btn-contact");
        boton.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                let nombre  = document.getElementById("nombre").value;
                let apellidos = document.getElementById("apellidos").value;
                let email   = document.getElementById("correo").value;
                let contrasena = document.getElementById("contrasena").value;
                let confir = document.getElementById("confir").value;
                if (contrasena != confir){
                    throw new Error("Contraseñas no coinciden");
                }
                if (contrasena.length < 1 || confir.length < 1){
                    throw new Error("Contraseña no puede ser en blanco")
                }
                if( nombre.length < 5 ) {
                    throw new Error("El nombre es demasiado corto!");
                }
                let pronombre  = getPronombre(); 
                let contact = { 
                    nombre_completo: nombre + apellidos,
                    email,
                    contrasena,
                    confir,
                    pronombre,
                    fecha_registro: (new Date()).toISOString() 
                };        
                guardarContacto( contact );
            } catch(e) { 
                mostrarError(e.message); 
            }
            return false;
        });    
    });
    function mostrarExito(mensaje) {
        const idExito = "form-suscripcion-exito";
        displayMensajeExito(true);
        mostrarMensaje(idExito, mensaje);
    }
    
    async function guardarContacto( contact ) {
    
        const url = "https://diplomado-frontweb-default-rtdb.firebaseio.com/contacto.json";
        const respuesta = await fetch(url, {
            method: "POST",
            body:   JSON.stringify(contact) 
        });
        const data = await respuesta.json();
        mostrarExito("Solicitud enviada!"); 
    }
    
    
    function getPronombre() {
        let inputSeleccionado = document.querySelector("input[name='pronombre']:checked");
        if ( inputSeleccionado == null ) {
            throw new Error("Seleccione un elemento por favor");
        }
        const pronombre = inputSeleccionado.value;
        return pronombre;
    }
    
    function mostrarError(mensaje) {
        const idError = "form-contacto-error";
        displayMensajeExito(false);
        mostrarMensaje(idError, mensaje); 
    }
    
    function mostrarExito(mensaje) {
        const idExito = "form-contacto-exito";
        displayMensajeExito(true);
        mostrarMensaje(idExito, mensaje);
    }
    
    function mostrarMensaje(idContenedor, mensaje) {
        const ul = document.querySelector(`#${idContenedor} ul`);
        const li = document.createElement("li")
        const liContent = document.createTextNode( mensaje )
        li.appendChild( liContent )
        ul.appendChild(li);
    }
    
    function displayMensajeExito(b) {
        const idExito = "form-contacto-exito";
        const idError = "form-contacto-error";
        
        if( b ) {        
            document.getElementById(idExito).style.display = "block";
            document.getElementById(idError).style.display = "none";
        } else {
            document.getElementById(idExito).style.display = "none";
            document.getElementById(idError).style.display = "block";
        }
    }