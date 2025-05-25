import express from "express";
import { articles } from "./data/data.js";

const app = express();

app.get("/", (req, res) => {
  console.log(req.url);

  res.send("articles");
});

app.get("/api/articles", (req, res) => {
  res.json(articles);
});

let port = 3000||300;

app.listen(port, () => {
  console.log(`app is listeninig on the port http://localhost:${port}`);
});