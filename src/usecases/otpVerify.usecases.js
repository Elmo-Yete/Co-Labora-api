const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Stripe = require("stripe");
const sgMail = require("@sendgrid/mail");
const stripe = new Stripe(process.env.STRIPE_KEY);
const create = async (data) => {
  console.log(data);
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const msg = {
      to: `${data.email}`,
      from: "colabora4@gmail.com",
      subject: "Codigo de verificacion de cuenta",
      text: "Por favor ingresa este codigo en la pagina para verificar tu cuenta",
      html: `<p>Ingresa este codigo en la pagina para verificar tu correo</p><strong>${otp}</strong>`,
    };
    await sgMail.send(msg);
    console.log("Email sent", otp);
    const ver = jwt.sign({ digits: otp }, "colabora");
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    data.otp = ver;
    data.verified = false;
    const register = await User.create(data);

    return register._id;
  } catch (error) {
    console.log("error en el usecase", error.message);
    return false;
  }
};

const validate = async (data) => {
  const { id, input } = data;

  const user = await User.findById(id);

  const decoded = jwt.verify(user.otp, "colabora");

  if (decoded.digits === input) {
    const account = await stripe.accounts.create({
      type: "custom",
      country: "MX",
      email: user.email,
      business_type: "individual",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    user.stripe_id = account.id;
    user.verified = true;
    user.save();
    return user;
  } else {
    user.verified = false;
    user.save();
    return user;
  }
};

module.exports = { create, validate };
