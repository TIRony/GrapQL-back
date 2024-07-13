const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./schema/authSchema");
const { ruruHTML } = require("ruru/server");
const routes = require("./routes");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/graphql", createHandler({ schema, graphiql: true }));

routes(app);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
