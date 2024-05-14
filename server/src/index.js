const express = require("express");
const logger = require("./logger");

const app = express();
const port = process.env.PORT || 3000;

const startServer = () => {
  app.use(express.json());

  app.listen(port, () => {
    logger.info(`Server listening at http://localhost:${port}`);
  });
};

module.exports = startServer;
