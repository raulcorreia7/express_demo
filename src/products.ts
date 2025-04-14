import { Request, Response } from "express";
import { ProductQuery, Product } from "./types";

import _ from "lodash";
import { getPaginated, typedFetch } from "./request";

const memoGetProducts = _.memoize(typedFetch<Product[]>);

const memoGetPaths = _.memoize((products: Product[], query: ProductQuery) => {
  if (query.storeKey) {
    products = products.filter((x) => x.storeKey === query.storeKey);
  }
  return products.map((x) => x.path).sort((a, b) => a.localeCompare(b));
});

export async function getProducts(
  req: Request<{}, {}, {}, ProductQuery>,
  response: Response
): Promise<void> {
  const url = "http://localhost:3002/products";
  try {
    const { query } = req;

    const output: Product[] = await memoGetProducts(url);
    const paths = memoGetPaths(output, query);
    const page = getPaginated(paths, query.page ?? 1, query.pageSize ?? 50);

    response.status(200).send(page);
  } catch (error) {
    console.log("error: problem making third party request: " + error);
    response.status(500).send("error: problem making third party request");
  }
}
