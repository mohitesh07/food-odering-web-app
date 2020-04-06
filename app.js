const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const menuRoutes = require("./api/routes/menu");
const ordersRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");

//Client static folder
app.use(express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/uploads"));

// Database Connection
mongoose.connect(
  "mongodb+srv://mohitesh07:" +
    process.env.MONGO_ATLAS_PASS +
    "@mohiteshapp-savyq.mongodb.net/onlineFoodOdering?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log(`MONGODB_ATLAS CONNECTED`)
);
mongoose.Promise = global.Promise;

// Logger
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Error HANDLER
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
