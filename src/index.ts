import express, { Express } from "express";
import _ from "lodash";

import { getProducts } from "./products";
import { getTodos } from "./todos";

const app: Express = express();
const port = 3000;

app.use(express.json());
app.set("json spaces", 2);
app.get("/products", getProducts);
app.get("/todos", getTodos);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
