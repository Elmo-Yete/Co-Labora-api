const jwt = require("../lib/jwt.lib");
require("dotenv").config();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const verify = async () => {
  try {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const msg = {
      to: "mtwwehardy@gmail.com",
      from: "colabora4@gmail.com",
      subject: "Codigo de verificacion de cuenta",
      text: "Por favor ingresa este codigo en la pagina para verificar tu cuenta",
      html: `<p>Ingresa este codigo en la pagina para verificar tu correo</p><strong>${otp}</strong>`,
    };
    await sgMail.send(msg);
    console.log("Email sent", otp);
    const hashed = await bcrypt.hash(otp, 10);
    console.log(hashed);
    return hashed;
  } catch (error) {
    console.log("error en el usecase", error.message);
    return false;
  }
};

module.exports = { verify };
