import { Request, Response } from "express";
import { Todo, TodoQuery } from "./types";
import _ from "lodash";
import { getPaginated, typedFetch } from "./request";

const memoGetTodos = _.memoize((url) => typedFetch<Todo[]>(url));

export async function getTodos(
  req: Request<{}, {}, {}, TodoQuery>,
  response: Response
): Promise<void> {
  const url = "https://jsonplaceholder.typicode.com/todos";
  try {
    const { query } = req;

    let output: Todo[] = await memoGetTodos(url);
    
    if(query.completed !== undefined) {
        const completed = query.completed === "true";
        output = output.filter(x => 
            x.completed === completed
        );}

    if(query.userId != null) {
        const userId = parseInt(query.userId, 10);
        output = output.filter(x => x.userId === userId)
    }
    
    const page = getPaginated<Todo>(
      output,
      query.page ?? 1,
      query.pageSize ?? 50
    );

    response.status(200).send(page);
  } catch (error) {
    console.log("error: problem making third party request: " + error);
    response.status(500).send("error: problem making third party request");
  }
}
