const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { getUserById } = require("./user.usecase");

const sendMails = async (data) => {
  //   console.log("si esta llegando a enviar los correor");
  const tenant = await getUserById(data.tenantId);
  const owner = await getUserById(data.lessorId);
  //   console.log("tenant", tenant, "owner", owner);
  const start = data.startDate;
  const end = data.endDate;
  const total = data.total;
  // Información del correo para el i   nquilino
  const tenantMsg = {
    to: `${tenant.email}`,
    from: "colabora4@gmail.com",
    subject: "Confirmación de tu reserva",
    text: "Este es un correo con la información de tu reserva",
    html: `
    <p>Esta es tu confirmacion de tu reservacion</p>
    <strong>Inicio de tu reserva ${start}</strong>
    <strong>Fin de tu reserva ${end}</strong>
    <strong>Cobro total:$ ${total}</strong>
    `,
  };

  // Información del correo para el propietario
  const ownerMsg = {
    to: `${owner.email}`,
    from: "colabora4@gmail.com",
    subject: "Reserva realizada en tu espacio",
    text: "Has recibido una nueva reserva en tu espacio",
    html: `
    <p>Un inquilino ha realizado una reserva en tu espacio. Por favor, verifica los detalles.</p>
    <strong>Inicio de la reserva${start}</strong>
    <strong>Fin de la reserva${end}</strong>
    `,
  };

  // Envío de correos electrónicos
  await sgMail.send([tenantMsg, ownerMsg]);
};

const sendOneMail = async (data) => {
  const ownerMsg = {
    to: "colabora4@gmail.com",
    from: data.email,
    subject: `${data.asunto}`,
    text: `${data.mensaje}`,
  };
  await sgMail.send(ownerMsg);
};

module.exports = { sendMails, sendOneMail };
