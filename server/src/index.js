const express = require("express");
const logger = require("./logger");
const routes = require("./routes");
const { connectToDatabase } = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message });
});

const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      logger.info(`Server listening at http://localhost:${port}`);
    });
  } catch (err) {
    logger.error("Failed to connect to the database", err);
    process.exit(1); // Exit the process if the database connection fails
  }
};

module.exports = startServer;
