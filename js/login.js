document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-card');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Detiene el envío predeterminado

      const email = document.getElementById('email').value.trim();
      const pass = document.getElementById('password').value.trim();

      if (email === '' || pass === '') {
        alert('Por favor, ingresa tu correo y contraseña.');
      } else {
        localStorage.setItem('usuarioActivo', email);
        alert(`¡Bienvenido/a a Chronos Travel, ${email}!`);
        window.location.href = "index.html"; // Redirige al inicio
      }
    });
  }
});