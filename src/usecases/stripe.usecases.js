const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_KEY);
const User = require("../models/user.model");

const payment = async (data) => {
  try {
    const { id, amount, acc, subtotal, email } = data;
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "mxn",
      payment_method: id,
      description: `Reservacion hecha, id del pago ${id}`,
      confirm: true,
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });
    const transfer = await stripe.transfers.create({
      amount: subtotal,
      currency: "mxn",
      destination: acc,
      transfer_group: payment.id, // Asegúrate de que la transferencia esté relacionada con el pago
    });
    return {
      payment,
      transfer,
    };
  } catch (error) {
    console.log("error en el usecase", error);
  }
};

const create = async () => {
  try {
    const account = await stripe.accounts.create({
      type: "custom",
      country: "MX",
      email: "test@gmail.com",
      business_type: "individual",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    return account;
  } catch (error) {
    console.log("error al crear cuenta", error.message);
  }
};

const onBoard = async (id) => {
  try {
    const user = await User.findById(id);
    const link = await stripe.accountLinks.create({
      account: user.stripe_id,
      refresh_url: "https://www.co-laboramx.com/your-spaces",
      return_url: "https://www.co-laboramx.com/your-spaces",
      type: "account_onboarding",
      collect: "eventually_due",
    });
    return link;
  } catch (error) {
    console.log("error en el onBoard", error.message);
  }
};

const delAcc = async (id) => {
  try {
    const deleted = await stripe.accounts.del(id);
    return deleted;
  } catch (error) {
    console.log("error al borrar el usuario", error.message);
  }
};

module.exports = { payment, create, onBoard, delAcc };
