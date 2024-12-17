const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4500;

const db = require("./data/db.json");
const { useFilterRegex } = require("./utils/tools");
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const { featuredProducts, popularProducts } = db.data;
const allData = [...featuredProducts, ...popularProducts];

const filter = (name, id) => {
  if (name)
    return {
      products: allData.filter((item) => useFilterRegex(item.name, name)),
    };
  if (id) return { products: allData.filter((item) => item.id === id) };
  return db;
};

app.post("/getProducts", (req, res) => {
  console.log("Request @", new Date());
  const requestData = req.body;
  const { partnerCode, name, id } = requestData;
  console.log(requestData);

  if (!partnerCode)
    res.status(400).send({ message: "Missing partnerCode on body request." });
  else if (partnerCode !== "NPCPONTOFRIO")
    res.status(400).send({ message: "Invalid partnerCode on body request." });
  else {
    if (name) res.send(filter(name));
    else if (id) res.send(filter(null, id));
    else res.send({ products: allData });
  }
});

app.use((req, res) => res.send("<h1>Nothing to see here...</h1>"));

app.listen(port, () => console.log(`node store app listening on port ${port}`));
