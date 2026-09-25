const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
const medicinesRouter = require('./routes/medicines');
const authRouter = require('./routes/auth');
const ambulanceRouter = require('./routes/ambulance');
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require(
  "./routes/orderRoutes"
);
app.use('/api/medicines', medicinesRouter);
app.use('/api/auth', authRouter);
app.use('/api/ambulance', ambulanceRouter);
app.use("/api/payment", paymentRoutes);
app.use(
  "/api/orders",
  orderRoutes
);
app.get('/', (req, res) => res.send('CureGo API Running'));

module.exports = app;