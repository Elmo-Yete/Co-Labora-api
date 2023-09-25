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

module.exports = { payment };
