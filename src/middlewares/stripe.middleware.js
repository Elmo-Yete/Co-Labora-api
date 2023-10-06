const createError = require("http-errors");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_KEY);
const create = async (req, res, next) => {
  try {
    const account = await stripe.accounts.create({
      type: "custom",
      country: "MX",
      email: "test@gmail.com",
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

module.exports = create;
