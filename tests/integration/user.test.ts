import supertest from "supertest"
import prisma from "../../src/database/database";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/user.factori";
import { duplicatedEmailError, invalidCredentialsError } from "../../src/errors/errors";
import app from "../../src/app";

const api = supertest(app)

beforeAll(async () => {
    await prisma.credential.deleteMany({})
    await prisma.network.deleteMany({})
    await prisma.session.deleteMany({})
    await prisma.user.deleteMany({})

})

describe("POST /user", () => {

    const generateValidBody = () => ({
        email: faker.internet.email(),
        password: faker.internet.password(10),
    });

    it("should respond with status 422 when body is not given", async () => {
        const response = await api.post("/user");

        expect(response.status).toBe(422);
    });

    it("should respond with status 422 when body is not right", async () => {
        const response = await api.post("/user").send({
            email: "lucas@gmail.com",
            password: "123"
        });

        expect(response.status).toBe(422);
    });

    it("if email already in use, should respond with status code 409 ", async () => {
        const body = generateValidBody();
        await createUser(body)
        const response = await api.post("/user").send({
            email: body.email,
            password: body.password
        });
        expect(response.status).toBe(409)
        expect(response.body).toEqual(duplicatedEmailError());
    })

    it("should respond with status 201 and create user when given email is unique", async () => {
        const body = generateValidBody();

        const response = await api.post("/user").send(body);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: expect.any(Number),
            email: body.email,
        });
    });
})

describe("POST/login", () => {

    const generateValidBody = () => ({
        email: faker.internet.email(),
        password: faker.internet.password(10),
    });
    it("if email or password are incorrect, should respond with status code 409", async () => {
        const body = generateValidBody()
        const response = await api.post("/login").send(body);

        expect(response.status).toBe(409);
        expect(response.body).toEqual(invalidCredentialsError());
    })

    it("if password are incorrect, should respond with status code 409", async () => {
        const user = await createUser()
        delete user.id
        user.password = faker.internet.password(10)
        const response = await api.post("/login").send(user);

        expect(response.status).toBe(409);
        expect(response.body).toEqual(invalidCredentialsError());
    })

    it("should respond with status 200", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await api.post("/login").send(body);

        expect(response.status).toBe(200);
    });
})



