import server from "../../src/app";
import supertest from "supertest"
import prisma from "../../src/database/database";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/user.factori";
import { duplicatedEmailError, invalidCredentialsError } from "../../src/errors/errors";

const api = supertest(server)

describe("POST /credential",()=>{
    it("should respond with status 401 if no token is given", async  (done) => {
        const response = await api.get("/credential");
        
        expect(response.status).toBe(401);
        done()
      });
})