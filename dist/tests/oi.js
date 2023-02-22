/* import server from "../src/app.js"
import supertest from "supertest"
import { string } from "joi"
import prisma from "../src/database/database.js"
import {faker} from "@faker-js/faker";

beforeAll(async () => {
    await prisma.jobs.deleteMany({})
})

afterAll(async () => {
    await prisma.jobs.deleteMany({})
})

const api = supertest(server)

describe("testeando a", () => {

    it("testando a + a ", () => {
        const resultado = 1 + 1 + 1

        expect(resultado).toBe(2)
    })
})

describe("Testando rota user", () => {

    it("testando post./user ", async () => {
        const resultado = await api.get("/user")
        await api.post("/user").send({

        })

        expect(resultado.status).toBe(200)
        expect(resultado.body).toEqual([1, 2, 3]) // COMPARAÇÃO ESTRITA
        expect(resultado.body).toContain(2)
        expect(resultado.body).toHaveLength(4)
        expect(resultado.body).toEqual(expect.arrayContaining([3, 10]))
        //Matchers para Objetos
        expect(resultado.body).toEqual({ id: 1 }) // COMPARAÇÃO ESTRITA
        expect(resultado.body).toMatchObject({ id: 1, oi: "oi" }) // serve qualquer um dos 2 desde que a chave e o valor sejam iguais
        expect(resultado.body).toEqual({
            id: expect.any(Number),
            oi: expect.any(String),
            i: expect.any(String)
        })
        //Arrays de Objetos
        expect(resultado.body).toEqual(expect.arrayContaining([expect.objectContaining({
            id: expect.any(Number),
            oi: expect.any(String),
            i: expect.any(String)
        })]))






    })
})

 */ 
