const express = require("express");
const Stripe = require("stripe");
const Order = require("../orders/order.model");

require("dotenv").config();
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        // Extract metadata
        const email = session.metadata.email;
        const name = session.metadata.name;
        const phone = session.metadata.phone;
        const productIds = JSON.parse(session.metadata.cart);
        const totalPrice = session.amount_total / 100;

        await Order.create({
          name,
          email,
          phone,
          totalPrice,
          productIds,
          address: {
            city: "Payment Collected",
            country: "",
            state: "",
            zipcode: ""
          }
        });

        console.log("Order saved successfully");
      }

      res.json({ received: true });
    } catch (err) {
      console.log("Webhook error:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);

module.exports = router;
