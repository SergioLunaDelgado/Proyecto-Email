document.addEventListener('DOMContentLoaded', () => {

    const email = {
        email: '',
        cc: '', //reto
        asunto: '',
        mensaje: ''
    }

    /* Seleccionar los elementos de la interfaz */
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc'); //reto
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    formulario.addEventListener('submit', enviarEmail);

    /* Asignar eventos */
    inputEmail.addEventListener('blur', validar);
    inputCC.addEventListener('blur', validar); //reto
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    btnReset.addEventListener('click', e => {
        e.preventDefault();
        if(confirm('¿Quieres limpiar el formulario?')) {
            /* Reiniciar el objeto */
            email.email = '';
            email.cc = ''; //reto
            email.asunto = '';
            email.mensaje = '';
            formulario.reset();
            comprobar();
        }
    });

    function validar(e) {
        if(e.target.value.trim() === '' && e.target.id !== 'cc') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobar();
            return;
        } 

        limpiarAlerta(e.target.parentElement);
        validarInput(e.target.type, e.target.value, e.target.parentElement);

        if(validarInput(e.target.type, e.target.value, e.target.parentElement)) {
            return;
        }

        /* Asignar los valores */
        email[e.target.name] = e.target.value.trim().toLowerCase();

        /* Comprobar el objeto */
        comprobar();
    }

    function mostrarAlerta(mensaje, padre) {
        /* Comprobar si existe alerta */
        limpiarAlerta(padre);

        /* Generar alerta en HTML */
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-3', 'text-center', 'font-bold', 'uppercase')
        /* Inyectar el error al formulario */
        padre.appendChild(error);

        setTimeout(() => {
            error.remove();
        }, 5000);
    }

    function limpiarAlerta(padre) {
        const alerta = padre.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
            sw = false;
        }
    }

    function validarInput(tipo, valor, padre) {
        if(tipo === 'email') {
            /* Esto es una expresion regular */
            const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
            // if(!valor.includes('@')) {
            if(!regex.test(valor)) {
                mostrarAlerta('Email invalido', padre);
                return true;
            }
        }
        if(tipo === 'text' || tipo === 'textarea') {
            if(valor.length < 5) {
                mostrarAlerta('El texto es muy corto', padre);
                return true;
            }
        }
    }

    function comprobar() {
        if(Object.entries(email).some( ([key, value]) => key !== 'cc' && value === '')) { //reto
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.add('hidden');
            if(email.cc === '') {
                alert(`Email enviado a = ${email.email}\nEl asunto es = ${email.asunto}\nEl mensaje es = ${email.mensaje}`);
            } else {
                alert(`Email enviado a = ${email.email}\nCon CC a = ${email.cc}\nEl asunto es = ${email.asunto}\nEl mensaje es = ${email.mensaje}`);
            }
            location.reload();
        }, 5000);
    }
});
