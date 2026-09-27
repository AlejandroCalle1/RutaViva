// Espera a que toda la página (login.html) esté cargada antes de hacer algo
document.addEventListener('DOMContentLoaded', () => {

  // Guardamos en variables los elementos del HTML con los que vamos a trabajar
  const loginForm = document.querySelector('.login-card'); // formulario de inicio de sesión
  const registroForm = document.getElementById('registro-card'); // formulario de registro
  const linkIrARegistro = document.getElementById('mostrar-registro'); // enlace "Regístrate"
  const linkIrALogin = document.getElementById('mostrar-login'); // enlace "Inicia sesión"

  // ---------------------------------------------------
  // 1) Mostrar/ocultar formularios 
  // ---------------------------------------------------

  // Al hacer clic en "Regístrate": esconde el login y muestra el registro
  linkIrARegistro.addEventListener('click', (e) => {
    e.preventDefault(); // evita que el link recargue la página
    loginForm.style.display = 'none';
    registroForm.style.display = 'block';
  });

  // Al hacer clic en "Inicia sesión": esconde el registro y muestra el login
  linkIrALogin.addEventListener('click', (e) => {
    e.preventDefault();
    registroForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // ---------------------------------------------------
  // 2) Guardar y leer la lista de turistas en localStorage
  //    (localStorage solo guarda texto, por eso usamos JSON)
  // ---------------------------------------------------

  // Lee la lista de turistas guardada. Si no hay ninguna todavía, devuelve una lista vacía []
  function leerTuristas() {
    const texto = localStorage.getItem('turistas'); // trae el texto guardado (o null si no hay nada)
    return texto ? JSON.parse(texto) : []; // si hay texto, lo convierte en lista; si no, lista vacía
  }

  // Guarda la lista completa de turistas (la convierte de lista a texto para poder guardarla)
  function guardarTuristas(listaTuristas) {
    localStorage.setItem('turistas', JSON.stringify(listaTuristas));
  }

  // ---------------------------------------------------
  // 3) Registro de un turista nuevo
  // ---------------------------------------------------
  registroForm.addEventListener('submit', (e) => {
    e.preventDefault(); // evita que el formulario se envíe de forma normal

    // Lee lo que la persona escribió en cada campo
    const nombre = document.getElementById('reg-nombre').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-password').value.trim();

    // Si algún campo quedó vacío, avisa y no sigue
    if (nombre === '' || email === '' || pass === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const turistas = leerTuristas(); // trae la lista actual de turistas

    // Revisa si ya existe un turista con ese mismo correo
    const yaExiste = turistas.some((turista) => turista.email === email);
    if (yaExiste) {
      alert('Ya existe una cuenta con ese correo. Intenta iniciar sesión.');
      return;
    }

    // Agrega el nuevo turista a la lista y la guarda
    turistas.push({ nombre: nombre, email: email, pass: pass });
    guardarTuristas(turistas);

    // Avisa que se creó la cuenta y regresa a la tarjeta de login
    alert('¡Cuenta creada! Ahora puedes iniciar sesión.');
    registroForm.reset(); // limpia los campos del formulario de registro
    registroForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // ---------------------------------------------------
  // 4) Inicio de sesión
  // ---------------------------------------------------
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // evita que el formulario se envíe de forma normal

    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('password').value.trim();

    // Si algún campo quedó vacío, avisa y no sigue
    if (email === '' || pass === '') {
      alert('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    const turistas = leerTuristas(); // trae la lista de turistas registrados

    // Busca un turista cuyo correo Y contraseña coincidan con lo escrito
    const turistaEncontrado = turistas.find(
      (turista) => turista.email === email && turista.pass === pass
    );

    // Si no se encontró ninguno, el correo o la contraseña están mal
    if (!turistaEncontrado) {
      alert('Correo o contraseña incorrectos. Si no tienes cuenta, regístrate primero.');
      return;
    }

    // Si sí se encontró: guarda quién inició sesión y entra a la página principal
    localStorage.setItem('usuarioActivo', email);
    alert('¡Bienvenido/a a Ruta Viva, ' + email + '!');
    window.location.href = "index.html";
  });

});