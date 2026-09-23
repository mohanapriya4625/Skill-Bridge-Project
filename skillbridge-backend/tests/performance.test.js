const request = require("supertest");
const express = require("express");
const db = require("../db");

const materialsRoutes = require("../routes/materials");

const app = express();

app.use(express.json());
app.use("/api/materials", materialsRoutes);

describe("SkillBridge Performance Tests", () => {

    test("GET /api/materials should respond within acceptable time", async () => {

        const startTime = performance.now();

        const response = await request(app)
            .get("/api/materials");

        const endTime = performance.now();

        const responseTime = endTime - startTime;

        console.log(
            `GET /api/materials response time: ${responseTime.toFixed(2)} ms`
        );

        expect(response.statusCode).toBe(200);

        // Basic response-time validation.
        // This is a test threshold, not a claimed performance improvement.
        expect(responseTime).toBeLessThan(2000);
    });

});