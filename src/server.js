const express = require("express");
const connectDB = require("./config");
const cors = require("cors");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./routes/graphqlRoutes");
const { ruruHTML } = require("ruru/server");
const resolvers = require("./resolvers/userResolvers");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());

app.use(
  "/graphql",
  createHandler({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
