import server from "../../src/app";
import supertest from "supertest"
import prisma from "../../src/database/database.js";
import { faker } from "@faker-js/faker";

const api = supertest(server)
beforeAll(async () => {
    await prisma.user.deleteMany({})
})

describe("POST /user", () => {

    it("should respond with status 422 when body is not given", async () => {
        const response = await api.post("/users");
    
        expect(response.status).toBe(422);
      });

   /*  it("if email already in use, should respond with status code 409 ", () => {
        await prisma.createUser()

        expect(resultado).toBe(2)
    }) */
})