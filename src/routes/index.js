const authRoutes = require("./authRoutes");

const routes = async (app) => {
  app.use("/api/auth", authRoutes);
};

module.exports = routes;
