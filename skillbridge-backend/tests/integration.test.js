const request = require("supertest");
const express = require("express");

const authRoutes = require("../routes/auth");
const materialsRoutes = require("../routes/materials");
const progressRoutes = require("../routes/progress");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/materials", materialsRoutes);
app.use("/api/progress", progressRoutes);


describe("SkillBridge Integration Tests", () => {

    test("Register → Login integration flow should work", async () => {

        const email =
            `integration${Date.now()}@test.com`;

        const registerResponse = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Integration Test User",
                email: email,
                password: "123456"
            });

        expect(registerResponse.statusCode).toBe(201);
        expect(registerResponse.body.success).toBe(true);


        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: email,
                password: "123456"
            });

        expect(loginResponse.statusCode).toBe(200);
        expect(loginResponse.body.success).toBe(true);
        expect(loginResponse.body.message)
            .toBe("Login successful");
        expect(loginResponse.body.token).toBeDefined();
    });


    test("Create → Get material integration flow should work", async () => {

        const createResponse = await request(app)
            .post("/api/materials")
            .send({
                title: "Integration Test Material",
                category: "Testing",
                description: "Material created for integration testing.",
                content: "Testing create and fetch operations."
            });

        expect(createResponse.statusCode).toBe(201);

        const materialId =
            createResponse.body.materialId;

        expect(materialId).toBeDefined();


        const getResponse = await request(app)
            .get(`/api/materials/${materialId}`);

        expect(getResponse.statusCode).toBe(200);
        expect(getResponse.body.success).toBe(true);
        expect(getResponse.body.material.id)
            .toBe(materialId);
    });


    test("Save → Get progress integration flow should work", async () => {

        const saveResponse = await request(app)
            .post("/api/progress")
            .send({
                user_id: 1,
                category: "Integration Testing",
                completed: 1,
                score: 90
            });

        expect(saveResponse.statusCode).toBe(201);
        expect(saveResponse.body.success).toBe(true);


        const getResponse = await request(app)
            .get("/api/progress/1");

        expect(getResponse.statusCode).toBe(200);
        expect(getResponse.body.success).toBe(true);
        expect(Array.isArray(getResponse.body.progress))
            .toBe(true);
    });

});