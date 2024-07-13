const authRoutes = require("./authRoutes");

const routes = async (app) => {
  app.use("/api", authRoutes);
};

module.exports = routes;
