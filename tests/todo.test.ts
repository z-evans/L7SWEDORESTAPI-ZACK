import request from "supertest";
import app from "../src/app";
import { pool, db } from "../src/db/database";
import { after } from "node:test";
import { todos } from "../src/db/schema/schema";

// ensure the database conn is closed before tests to prevent hanging

after(async () => {
  await pool.end();
});

// clean table before tests can run
beforeEach(async () => {
  await db.delete(todos);
});

const testTodo = {
  title: "Test Todo",
  description: "This is a test todo item",
};

const oddTodo = {
  title: "Odd Todo",
  description: "This is an odd todo item",
};

describe("TODO CRUD operations", () => {
  it("should create a new todo", async () => {
    const response = await request(app).post("/api/todos").send(testTodo);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(testTodo.title);
    expect(response.body.description).toBe(testTodo.description);
  });
  it("get all todos", async () => {
    const response = await request(app).get("/api/todos");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  it("get todo by id", async () => {
    const createResponse = await request(app).post("/api/todos").send(testTodo);
    const todoId = createResponse.body.id;

    const getResponse = await request(app).get(`/api/todos/${todoId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe(todoId);
  });
  it("get todo by title", async () => {
    const createResponse = await request(app).post("/api/todos").send(testTodo);
    await request(app).post("/api/todos").send(oddTodo);
    const todoTitle = createResponse.body.title;

    const getResponse = await request(app).get(
      "/api/todos/search/" + todoTitle
    );
    expect(getResponse.status).toBe(200);
    const todos = getResponse.body;
    expect(todos.length).toEqual(1);
    expect(todos[0].title).toBe(todoTitle);
  });
  it("update a todo by id", async () => {
    const createResponse = await request(app).post("/api/todos").send(testTodo);
    const todoId = createResponse.body.id;

    const updatedData = {
      title: "Updated Title",
      description: "Updated Description",
    };

    const updateResponse = await request(app)
      .put(`/api/todos/${todoId}`)
      .send(updatedData);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toBe(updatedData.title);
    expect(updateResponse.body.description).toBe(updatedData.description);
  });
  it("delete a todo by id", async () => {
    const createResponse = await request(app).post("/api/todos").send(testTodo);
    const todoId = createResponse.body.id;

    const deleteResponse = await request(app).delete(`/api/todos/${todoId}`);
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get(`/api/todos/${todoId}`);
    expect(getResponse.status).toBe(404);
  });
});
