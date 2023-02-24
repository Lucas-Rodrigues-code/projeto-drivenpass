import supertest from "supertest"
import prisma from "../../src/database/database";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/user.factori";
import { duplicatedEmailError, idError, invalidCredentialsError, titleAlreadyInUse } from "../../src/errors/errors";
import * as jwt from "jsonwebtoken";
import { createCredential, generateValidToken } from "../factories/credential.factori";
import app from "../../src/app";

const api = supertest(app)

beforeAll(async () => {
  await prisma.credential.deleteMany({})
  await prisma.network.deleteMany({})
  await prisma.session.deleteMany({})
  await prisma.user.deleteMany({})

})

beforeEach(async () => {
  await prisma.credential.deleteMany({})
  await prisma.network.deleteMany({})
  await prisma.session.deleteMany({})
  await prisma.user.deleteMany({})
})

describe("GET /credential", () => {
  it("should respond with status 401 if no token is not given", async () => {
    const response = await api.get("/credential").set("Authorization", `Bearer `);

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await api.get("/credential").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await api.get("/credential").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  it("should respond with status code 200 when token is valid", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const response = await api.get("/credential").set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
  });

})

describe("POST/credential", () => {

  it("should respond with status code 422 when body is not given", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await api.post("/credential").send({}).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(422);
  });

  it("should respond with status code 401 when the title is already in use", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const body = {
      title: faker.lorem.word(),
      url: faker.internet.url(),
      username: faker.lorem.word(),
      password: faker.internet.password(6)
    }
    const credential = await createCredential(body.title, body.url, body.username, body.password, user.id)
    delete credential.id
    delete credential.userId
    const response = await api.post("/credential").send(credential).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(401);
    expect(response.body).toEqual(titleAlreadyInUse());
  });

  it("should respond with status code 201 when credential is creat", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const body = {
      title: faker.lorem.word(),
      url: faker.internet.url(),
      username: faker.lorem.word(),
      password: faker.internet.password(6)
    }
    const response = await api.post("/credential").send(body).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

})

describe("GET/credential/id", () => {
  it("should respond with status code 409 when ID is it's not your or not exist", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await api.get("/credential/0").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(409);
    expect(response.body).toEqual(idError());
  });

   it("should respond with status code 409 when ID exist but its not your", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = {
        title: faker.lorem.word(),
        url: faker.internet.url(),
        username: faker.lorem.word(),
        password: faker.internet.password(6)
      }
      const credential = await createCredential(body.title, body.url, body.username, body.password, user.id)
      

      const user2 = await createUser();
      const token2 = await generateValidToken(user);

      const body2 = {
        title: faker.lorem.word(),
        url: faker.internet.url(),
        username: faker.lorem.word(),
        password: faker.internet.password(6)
      }
      const credential2 = await createCredential(body2.title, body2.url, body2.username, body2.password, user2.id)

      const response = await api.get(`/credential/${credential2.id}`).set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(409);
    });   

   /*  it("should respond with status code 409 when ID exist", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = {
        title: faker.lorem.word(),
        url: faker.internet.url(),
        username: faker.lorem.word(),
        password: faker.internet.password(6)
      }
      const credential = await createCredential(body.title, body.url, body.username, body.password, user.id)
      
      const response = await api.get(`/credential/${credential.id}`).set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(200);
    });  */
})

describe("DELETE/credential/id", () => {

  it("should respond with status code 409 when ID is it's not your or not exist", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await api.delete("/credential/0").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(409);
    expect(response.body).toEqual(idError());
  });

  it("should respond with status code 409 when ID exist but its not your", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const body = {
      title: faker.lorem.word(),
      url: faker.internet.url(),
      username: faker.lorem.word(),
      password: faker.internet.password(6)
    }
    const credential = await createCredential(body.title, body.url, body.username, body.password, user.id)
    

    const user2 = await createUser();
    const token2 = await generateValidToken(user);

    const body2 = {
      title: faker.lorem.word(),
      url: faker.internet.url(),
      username: faker.lorem.word(),
      password: faker.internet.password(6)
    }
    const credential2 = await createCredential(body2.title, body2.url, body2.username, body2.password, user2.id)

    const response = await api.delete(`/credential/${credential2.id}`).set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(409);
    expect(response.body).toEqual(idError());
  }); 
})

