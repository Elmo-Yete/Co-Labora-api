const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_KEY);

const payment = async (data) => {
  try {
    const { id, amount } = data;
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "mxn",
      payment_method: id,
      description: `Reservacion hecha, id del pago ${id}`,
      confirm: true,
      automatic_payment_methods: { enabled: true },
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });
    return payment;
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

const onBoard = async () => {
  try {
    const link = await stripe.accountLinks.create({
      account: "acct_1Nundh4EwXGQUYp4",
      refresh_url: "https://example.com/reauth",
      return_url: "https://example.com/return",
      type: "account_onboarding",
      collect: "eventually_due",
    });
    return link;
  } catch (error) {
    console.log("error en el onBoard", error.message);
  }
};

module.exports = { payment, create, onBoard };
