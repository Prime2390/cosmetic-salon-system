const express = require("express");
const cors = require("cors");
const prisma = require("./lib/prisma");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      message: "API is working",
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      message: "API is working, but database connection failed",
      error: error.message,
    });
  }
});

app.use("/api", routes);
module.exports = app;