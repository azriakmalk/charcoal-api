const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.argv[2] || 3000;
const userRoutes = require("./routes/user");
const itemRoutes = require("./routes/item");
const categoryRoutes = require("./routes/category");
const kilnRoutes = require("./routes/kiln_process");
const levelRoutes = require("./routes/level");
const transactionRoutes = require("./routes/transaction");
const dashboardRoutes = require("./routes/dashboard");
const db = require("./config/database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
  next();
});

app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/level", levelRoutes);
app.use("/category", categoryRoutes);
app.use("/kiln", kilnRoutes);
app.use("/transaction", transactionRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(port, async () => {
  try {
    await db.authenticate();
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
  console.log(`Example app listening on port ${port}`);
});
