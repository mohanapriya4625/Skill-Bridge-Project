]# SkillBridge Week 5 - Testing Report

## 1. Project Overview

SkillBridge is a Placement Preparation Portal developed using Node.js, Express.js, MySQL, HTML, CSS and JavaScript.

The application provides APIs for authentication, study materials, aptitude questions and student progress tracking.

---

## 2. Testing Objective

The main objectives of testing are:

* Verify API functionality.
* Validate user input.
* Verify error handling.
* Test CRUD operations.
* Test integration between multiple APIs.
* Identify and fix application errors.
* Improve application reliability and stability.
* Perform basic API response-time testing.

---

## 3. Testing Tools

| Tool       | Purpose                     |
| ---------- | --------------------------- |
| Jest       | Automated testing framework |
| Supertest  | HTTP/API testing            |
| Node.js    | Backend runtime             |
| Express.js | REST API framework          |
| MySQL      | Database                    |
| Postman    | Manual API testing          |
| PowerShell | API and server testing      |

---

## 4. Unit / API Test Cases

The following API scenarios were tested:

| No. | API Area       | Test Type                   | Result |
| --- | -------------- | --------------------------- | ------ |
| 1   | Authentication | Invalid login               | PASS   |
| 2   | Authentication | Empty credentials           | PASS   |
| 3   | Authentication | Missing registration fields | PASS   |
| 4   | Authentication | Short password              | PASS   |
| 5   | Authentication | Valid login                 | PASS   |
| 6   | Materials      | Missing required fields     | PASS   |
| 7   | Materials      | Get all materials           | PASS   |
| 8   | Materials      | Get material by ID          | PASS   |
| 9   | Materials      | Invalid material ID         | PASS   |
| 10  | Materials      | Create material             | PASS   |
| 11  | Materials      | Update material             | PASS   |
| 12  | Materials      | Delete material             | PASS   |
| 13  | Questions      | Get all questions           | PASS   |
| 14  | Questions      | Invalid question ID         | PASS   |
| 15  | Questions      | Missing question details    | PASS   |
| 16  | Questions      | Create question             | PASS   |
| 17  | Questions      | Update question             | PASS   |
| 18  | Questions      | Delete question             | PASS   |
| 19  | Progress       | Missing user/category       | PASS   |
| 20  | Progress       | Get user progress           | PASS   |
| 21  | Progress       | Save progress               | PASS   |

---

## 5. Integration Testing

Integration tests were implemented using Jest and Supertest.

### Integration Flow 1

Register User → Login User

**Result: PASS**

### Integration Flow 2

Create Study Material → Fetch Study Material

**Result: PASS**

### Integration Flow 3

Save Progress → Fetch Progress

**Result: PASS**

---

## 6. Performance Testing

A basic performance test was implemented using Jest and Supertest.

The following API endpoint was tested:

```text
GET /api/materials
```

The test measures the API response time and verifies that the response is completed within the defined test threshold.

Observed response times during testing included:

```text
40.58 ms
55.16 ms
```

The performance test passed successfully.

Response time can vary between different test runs depending on the local system and database conditions.

No unsupported percentage-based performance improvement is claimed.

---

## 7. Test Execution Summary

The complete automated test suite was executed using:

```bash
npm test
```

Final result:

```text
Test Suites: 3 passed, 3 total
Tests:       29 passed, 29 total
Snapshots:   0 total
```

### Final Test Status

**29/29 automated tests passed successfully.**

The automated tests covered API functionality, integration flows and performance validation.

---

## 8. Error Testing

The following error conditions were tested:

* Empty login credentials.
* Invalid login credentials.
* Missing registration fields.
* Password shorter than the required length.
* Missing material title/category.
* Invalid material ID.
* Missing aptitude question details.
* Invalid aptitude question ID.
* Missing progress user ID/category.

The APIs returned appropriate HTTP status codes and error messages for the tested cases.

---

## 9. Debugging Performed

During development and testing, several issues were identified and resolved.

### Issue 1: Invalid API ID

A PUT request initially used an incorrect question ID and returned:

```text
404 - Aptitude question not found
```

The available question ID was checked using the API and the test was updated with the valid ID.

**Status:** Resolved successfully.

### Issue 2: Server Connection Error

PowerShell API requests initially returned:

```text
Unable to connect to the remote server
```

The backend server was started using:

```bash
node server.js
```

After starting the server, the API requests worked successfully.

**Status:** Resolved successfully.

### Issue 3: Jest Open Handle Warning

During earlier test runs, Jest displayed an asynchronous operation warning related to the database connection.

The database connection cleanup was reviewed and test execution was checked using:

```bash
npm test -- --detectOpenHandles
```

The final test execution completed with all test suites and tests passing successfully.

**Status:** Verified.

---

## 10. Debugging Techniques Used

The following techniques were used:

* Console logging.
* HTTP status code verification.
* API response inspection.
* PowerShell API requests.
* Jest test output analysis.
* Supertest request testing.
* Database record verification.
* Testing invalid and valid inputs separately.
* Jest open-handle detection.

---

## 11. Testing Strategy

The project follows multiple testing approaches.

### Unit / API Testing

Individual API endpoints were tested with valid and invalid inputs.

### Integration Testing

Multiple API operations were tested together to verify that different parts of the backend work correctly.

### Error Testing

Invalid input, missing data and invalid IDs were tested to verify proper error handling.

### Performance Testing

The study materials API response time was measured using an automated Jest and Supertest test.

### Manual Testing

PowerShell and Postman were used to manually verify API behavior.

---

## 12. Optimization and Reliability

The following improvements were completed during Week 5:

* Automated API tests were added.
* Input validation was verified.
* Error responses were tested.
* CRUD operations were tested.
* Integration flows were tested.
* Database-backed API operations were verified.
* Reusable automated test cases were created.
* API response-time testing was added.
* Jest open-handle behavior was investigated.
* Debugging and error documentation was created.

These improvements help identify backend issues early, improve testing reliability and make future debugging easier.

No unsupported performance percentage or benchmark improvement is claimed.

---

## 13. Test Files

The following automated test files were created:

### Server/API Tests

```text
tests/server.test.js
```

Tests authentication, materials, aptitude questions and progress APIs.

### Integration Tests

```text
tests/integration.test.js
```

Tests Register → Login, Create Material → Get Material and Save Progress → Get Progress flows.

### Performance Tests

```text
tests/performance.test.js
```

Tests the response time of the study materials API.

---

## 14. Documentation Files

The following Week 5 documentation files are available:

```text
docs/test-report.md
docs/error-log.md
```

These documents contain testing results, debugging information, errors encountered and resolutions.

---

## 15. Final Conclusion

Week 5 testing successfully verified the major SkillBridge backend APIs.

A total of **29 automated tests** were executed across **three test suites**, and all tests passed successfully.

The testing process helped verify:

* API functionality.
* Input validation.
* Error handling.
* CRUD operations.
* Database interaction.
* Authentication.
* Progress tracking.
* Integration between API operations.
* API response-time behavior.
* Backend reliability.

The final automated test result was:

```text
Test Suites: 3 passed, 3 total
Tests:       29 passed, 29 total
```

The backend testing and debugging activities for Week 5 have been completed successfully.
