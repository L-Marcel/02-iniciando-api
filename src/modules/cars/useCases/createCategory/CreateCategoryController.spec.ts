import request from "supertest";
import { getApp } from "app";
import { Connection } from "typeorm";
import { Express } from "express";

let connection: Connection;
let app: Express;
let token: string;


describe("Create category controller", () => {
  beforeAll(async() => {
    const appInstance = await getApp();

    app = appInstance.app;
    connection = appInstance.connection;

    const resToken = await request(app)
      .post("/users/auth/sessions")
      .send({
        email: "admin@rentx.com",
        password: "admin",
      });

    token = resToken.body.token;
  });

  afterAll(async() => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category", async() => {
    const res = await request(app)
      .post("/categories")
      .send({
        name: "Supertest",
        description: "Category supertest"
      })
      .set({
        Authorization: `Bearer ${token}`
      }).expect(201);

    
    expect(res.statusCode).toBe(201);
  });
});