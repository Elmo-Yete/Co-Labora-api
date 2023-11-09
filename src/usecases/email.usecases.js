const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { getUserById } = require("./user.usecase");

const sendMails = async (data) => {
  console.log("si esta llegando a enviar los correor");
  const tenant = await getUserById(data.tenantId);
  const owner = await getUserById(data.lessorId);
  console.log("esto es data", data);
  const start = data.startDate;
  const end = data.endDate;
  const total = data.total;
  const subto = data.subtotal;
  const property = data.property.propertyName;
  // Información del correo para el i   nquilino
  const tenantMsg = {
    to: `${tenant.email}`,
    from: { name: "Co-Labora", email: "colabora4@gmail.com" },
    templateId: "d-79fa637eeeb24715843b7e6400fe97e0",
    dynamicTemplateData: {
      property: property,
      start: start,
      end: end,
      total: total,
    },
  };

  // Información del correo para el propietario
  const ownerMsg = {
    to: `${owner.email}`,
    from: { name: "Co-Labora", email: "colabora4@gmail.com" },
    templateId: "d-24f407394e8543bab54c83c2558b8faa",
    dynamicTemplateData: {
      property: property,
      start: start,
      end: end,
      subto: subto,
    },
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
