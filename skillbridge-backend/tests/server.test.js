const request = require("supertest");
const express = require("express");
const db = require("../db");

const authRoutes = require("../routes/auth");
const materialsRoutes = require("../routes/materials");
const questionsRoutes = require("../routes/questions");
const progressRoutes = require("../routes/progress");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/materials", materialsRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/progress", progressRoutes);

describe("SkillBridge Authentication API", () => {

    test("POST /api/auth/login should reject empty credentials", async () => {

        const response = await request(app)
            .post("/api/auth/login")
            .send({});

        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);

        expect(response.body.message)
            .toBe("Email and password are required");
    });

});
test("POST /api/auth/login should reject invalid credentials", async () => {

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "invalid-test-user@example.com",
            password: "wrongpassword123"
        });

    expect(response.statusCode).toBe(401);

    expect(response.body.success).toBe(false);

    expect(response.body.message)
        .toBe("Invalid email or password");
});
test("POST /api/auth/register should reject missing fields", async () => {

    const response = await request(app)
        .post("/api/auth/register")
        .send({});

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message)
        .toBe("Name, email and password are required");
});
test("POST /api/auth/register should reject short password", async () => {

    const response = await request(app)
        .post("/api/auth/register")
        .send({
            name: "Test User",
            email: "short-password-test@example.com",
            password: "123"
        });

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message)
        .toBe("Password must contain at least 6 characters");
        });
test("POST /api/materials should reject missing title and category", async () => {

    const response = await request(app)
        .post("/api/materials")
        .send({});

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message)
        .toBe("Title and category are required");
});
test("GET /api/materials should return study materials", async () => {

    const response = await request(app)
        .get("/api/materials");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message)
        .toBe("Study materials fetched successfully");
    expect(Array.isArray(response.body.materials)).toBe(true);
});
test("GET /api/materials/:id should return a study material", async () => {

    const response = await request(app)
        .get("/api/materials/2");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message)
        .toBe("Study material fetched successfully");
    expect(response.body.material).toBeDefined();
});
test("GET /api/materials/:id should return 404 for invalid material", async () => {

    const response = await request(app)
        .get("/api/materials/99999");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message)
        .toBe("Study material not found");
});
test("PUT /api/materials/:id should reject missing title and category", async () => {

    const response = await request(app)
        .put("/api/materials/2")
        .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message)
        .toBe("Title and category are required");
});
test("DELETE /api/materials/:id should return 404 for invalid material", async () => {

    const response = await request(app)
        .delete("/api/materials/99999");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message)
        .toBe("Study material not found");
});
test("GET /api/questions should return aptitude questions", async () => {

    const response = await request(app)
        .get("/api/questions");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.questions).toBeDefined();
    expect(Array.isArray(response.body.questions)).toBe(true);
});
test("GET /api/questions/:id should return 404 for invalid question", async () => {

    const response = await request(app)
        .get("/api/questions/99999");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message)
        .toBe("Aptitude question not found");
});
test("POST /api/questions should reject missing question details", async () => {

    const response = await request(app)
        .post("/api/questions")
        .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message)
        .toBe("Question, all options and correct answer are required");
});
test("PUT /api/questions/:id should reject missing question details", async () => {

    const response = await request(app)
        .put("/api/questions/99999")
        .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message)
        .toBe("Question, all options and correct answer are required");
});
test("DELETE /api/questions/:id should return 404 for invalid question", async () => {

    const response = await request(app)
        .delete("/api/questions/99999");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message)
        .toBe("Aptitude question not found");
});
test("POST /api/progress should reject missing user ID and category", async () => {

    const response = await request(app)
        .post("/api/progress")
        .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message)
        .toBe("User ID and category are required");
});
test("GET /api/progress/:user_id should return user progress", async () => {

    const response = await request(app)
        .get("/api/progress/1");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message)
        .toBe("Progress fetched successfully");
    expect(Array.isArray(response.body.progress)).toBe(true);
});
test("POST /api/progress should save valid progress", async () => {

    const response = await request(app)
        .post("/api/progress")
        .send({
            user_id: 1,
            category: "JavaScript",
            completed: 1,
            score: 80
        });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message)
        .toBe("Progress saved successfully");
    expect(response.body.progressId).toBeDefined();
});
test("POST /api/questions should create a valid aptitude question", async () => {

    const response = await request(app)
        .post("/api/questions")
        .send({
            question: "What is 2 + 2?",
            option_a: "3",
            option_b: "4",
            option_c: "5",
            option_d: "6",
            correct_answer: "B",
            explanation: "2 + 2 equals 4."
        });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message)
        .toBe("Aptitude question created successfully");
    expect(response.body.questionId).toBeDefined();
});
test("POST /api/materials should create a valid study material", async () => {

    const response = await request(app)
        .post("/api/materials")
        .send({
            title: "Testing Fundamentals",
            category: "Testing",
            description: "Learn software testing basics.",
            content: "Unit testing, integration testing and debugging."
        });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message)
        .toBe("Study material created successfully");
    expect(response.body.materialId).toBeDefined();
});
test("PUT /api/questions/:id should update a valid aptitude question", async () => {

    const response = await request(app)
        .put("/api/questions/2")
        .send({
            question: "What is 5 + 5?",
            option_a: "8",
            option_b: "9",
            option_c: "10",
            option_d: "11",
            correct_answer: "C",
            explanation: "5 + 5 equals 10."
        });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message)
        .toBe("Aptitude question updated successfully");
});
test("PUT /api/materials/:id should update a valid study material", async () => {

    const response = await request(app)
        .put("/api/materials/2")
        .send({
            title: "Updated Quantitative Aptitude",
            category: "Quantitative Aptitude",
            description: "Updated aptitude study material.",
            content: "Percentages, profit and loss, ratio and time work."
        });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message)
        .toBe("Study material updated successfully");
});
test("DELETE /api/materials/:id should delete a valid study material", async () => {

    const createResponse = await request(app)
        .post("/api/materials")
        .send({
            title: "Temporary Test Material",
            category: "Testing",
            description: "Temporary material for delete testing.",
            content: "This material will be deleted after testing."
        });

    expect(createResponse.statusCode).toBe(201);

    const materialId = createResponse.body.materialId;

    const deleteResponse = await request(app)
        .delete(`/api/materials/${materialId}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.success).toBe(true);
    expect(deleteResponse.body.message)
        .toBe("Study material deleted successfully");
});
test("DELETE /api/questions/:id should delete a valid aptitude question", async () => {

    const createResponse = await request(app)
        .post("/api/questions")
        .send({
            question: "Temporary test question?",
            option_a: "A",
            option_b: "B",
            option_c: "C",
            option_d: "D",
            correct_answer: "A",
            explanation: "Temporary question for delete testing."
        });

    expect(createResponse.statusCode).toBe(201);

    const questionId = createResponse.body.questionId;

    const deleteResponse = await request(app)
        .delete(`/api/questions/${questionId}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.success).toBe(true);
    expect(deleteResponse.body.message)
        .toBe("Aptitude question deleted successfully");
});
test("POST /api/auth/login should login with valid credentials", async () => {

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "mohanatech04@gmail.com",
            password: "123456"
        });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message)
        .toBe("Login successful");
    expect(response.body.token).toBeDefined();
});
afterAll((done) => {
    db.end((err) => {
        done(err);
    });
});