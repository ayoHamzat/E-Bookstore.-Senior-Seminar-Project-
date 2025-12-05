const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require('dotenv').config()
const paymentWebhooks = require("./src/payments/payment.webhook");

app.use("/api/payments", paymentWebhooks);

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://book-app-frontend-tau.vercel.app', 'http://localhost:5174'],
    credentials: true
}))

// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route")
const userRoutes =  require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")
const paymentRoutes = require("./src/payments/payment.route");



app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/payments", paymentRoutes);
app.use("/api/payments", paymentWebhooks);

async function main() {
  await mongoose.connect(
    "mongodb+srv://afhamzat13:marmoush%407000@cluster0.xq1l5st.mongodb.net/admin_database?retryWrites=true&w=majority"
  );
  app.use("/", (req, res) => {
    res.send("Book Store Server is running!");
  });
}

main().then(() => console.log("Mongodb connect successfully!")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
