const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create Checkout Session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems, customerInfo } = req.body;

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
        },
        unit_amount: Math.round(item.newPrice * 100), // convert to cents
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      metadata: {
        email: customerInfo.email,
        name: customerInfo.name,
        phone: customerInfo.phone,
        cart: JSON.stringify(cartItems.map(i => i._id)),
      }
    });

    res.json({ url: session.url });

  } catch (error) {
    console.log("Stripe error", error);
    res.status(500).json({ message: "Error creating Stripe session" });
  }
});

module.exports = router;
