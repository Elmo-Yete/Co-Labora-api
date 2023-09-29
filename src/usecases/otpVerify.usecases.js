const Otp = require("../models/otpVerified.model");
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
    console.log("Email sent");
    return true;
  } catch (error) {
    console.log("error en el usecase", error.message);
    return false;
  }
};

module.exports = { verify };
