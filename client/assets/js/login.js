//                      NOMBRE DEL BOTON EN EL HTNL---------------> NOMBRE DE LA FUNCION
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);

//VAR
 //CONT ALL
var contenedor_login_register = document.querySelector(".contenedor__login-register");
 //FORMS
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
 //BOX FORMS
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

function iniciarSesion() {
    formulario_register.style.display = "none";
    contenedor_login_register.style.left = "10px";
    formulario_login.style.display = "block";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.opacity = "0";
}

function register() {
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "410px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.opacity = "0";
    caja_trasera_login.style.opacity = "1";
}

// login.js

// URL de tu servidor GraphQL
const graphqlUrl = 'http://localhost:3000/graphql';

// Función para realizar una solicitud GraphQL
async function fetchGraphQL(query) {
  const response = await axios.post(graphqlUrl, { query });
  return response.data;
}

// Función para realizar la verificación del inicio de sesión
async function login() {
  const correo = document.querySelector('.formulario__login input[type="text"]').value;
  const contrasenia = document.querySelector('.formulario__login input[type="password"]').value;

  const query = `
    query {
      login(loginUserInput: {
        correo: "${correo}",
        contrasenia: "${contrasenia}"
      }) {
        access_token
      }
    }
  `;

  try {
    const data = await fetchGraphQL(query);
    const accessToken = data.data.login.access_token;

    if (accessToken) {
      // El correo y la contraseña son válidos, puedes realizar acciones adicionales
      console.log('Inicio de sesión exitoso');
      // Guarda el token de acceso en una variable o en el almacenamiento local (localStorage) para usarlo posteriormente
    } else {
      // El correo y/o la contraseña son incorrectos
      console.log('Credenciales inválidas');
    }
  } catch (error) {
    console.error(error);
  }
}

// Escucha el evento de envío del formulario de inicio de sesión y llama a la función de inicio de sesión
document.querySelector('.formulario__login').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  login();
});



// Obtener elementos del formulario de registro
const nombreInput = document.getElementById('nombreInput');
const apPaternoInput = document.getElementById('apPaternoInput');
const apMaternoInput = document.getElementById('apMaternoInput');
const fechNacimientoInput = document.getElementById('fechNacimientoInput');
const numTelefonoInput = document.getElementById('numTelefonoInput');
const correoInput = document.getElementById('correoInput');
const contraseniaInput = document.getElementById('contraseniaInput');
const registrarseBtn = document.getElementById('registrarseBtn');

// Función para realizar la consulta GraphQL
const signup = async () => {
  try {
    const response = await axios.post('http://localhost:3000/graphql', {
      query: `
        mutation {
          signup(signupUserInput: {
            nombre: "${nombreInput.value}",
            apPaterno: "${apPaternoInput.value}",
            apMaterno: "${apMaternoInput.value}",
            fech_nacimiento: "${fechNacimientoInput.value}",
            numTelefono: "${numTelefonoInput.value}",
            tipo_usuario_id: 1,
            contrasenia: "${contraseniaInput.value}",
            correo: "${correoInput.value}",
            role_usuario: "trabajador"
          }) {
            id
            nombre
            apPaterno
            apMaterno
            tipoUsuario {
              nombre
            }
            role_usuario
          }
        }
      `,
    });

    const data = response.data.data.signup;

    // Procesar la respuesta
    console.log('Registro exitoso:', data);
    // Aquí puedes realizar cualquier acción adicional con los datos de respuesta, como mostrar un mensaje de éxito, redirigir a otra página, etc.
  } catch (error) {
    console.error('Error al realizar el registro:', error);
    // Manejar el error de acuerdo a tus necesidades
  }
};

// Agregar un controlador de eventos al botón de registro
registrarseBtn.addEventListener('click', signup);
