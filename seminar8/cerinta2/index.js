const express = require("express");
const departmentsRouter = require("./routes/departments");
const statusRouter = require("./routes/status");
require("dotenv").config();

const app = express();

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api", departmentsRouter);
app.use("/status", statusRouter);

// Handler de erori – afiseaza stack-ul
app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

// Handler de erori – raspuns catre client
app.use((err, req, res, next) => {
  res.status(500).json({
    error: "Internal Server Error",
  });
});

app.set("port", process.env.PORT || 7000);

app.listen(app.get("port"), () => {
  console.log(`Server started on http://localhost:${app.get("port")}`);
});
