import nodemailer from "nodemailer";

export const emailRegister = async(datos) => {
  const { email, name, token} = datos;

  const transport = nodemailer.createTransport({
    // copiar desde mailtrap da la ventaja de que viene 
    // con las credenciales
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

//   informacion del email

const info = await transport.sendMail({
    from: '"Uptask - administrador de proyectos" <cuentas@uptask.com',
    to: email,
    subject: "Uptask - comprueba tu cuenta",
    text: "comprueba tu cuenta en Uptask",
    html: `
    <p> Hola: ${name}, comprueba tu cuenta en Uptask</p>
    <p> tu cuenta esta casi lista, solo debes confirmarla en el siguiente
    enlace: 
    <a href = "${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Confirmar cuenta</a>
    <p> si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    </p>
    `
})
};

export const emailforgotPassword = async(datos) => {
  const { email, name, token} = datos;

  // TODO: mover hacia variables de entorno
  const transport = nodemailer.createTransport({
    // copiar desde mailtrap da la ventaja de que viene 
    // con las credenciales
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

//   informacion del email

const info = await transport.sendMail({
    from: '"Uptask - administrador de proyectos" <cuentas@uptask.com',
    to: email,
    subject: "Uptask - restablece tu Password",
    text: "Rstablece tu password en Uptask",
    html: `
    <p> Hola: ${name}, has solicitado restablecer tu password</p>

    <p> dale click en el siguiente enlace para una nueva contraseña
    enlace: 
    <a href = "${process.env.FRONTEND_URL}/olvide-contraseña/${token}">Restablecer password</a>

    <p> si tu no solicitaste cambiar el password, puedes ignorar el mensaje</p>
    </p>
    `
})
};
