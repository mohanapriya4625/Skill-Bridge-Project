# SkillBridge Week 5 - Error Log and Debugging Report

## 1. Invalid API ID

### Problem
A PUT request was initially tested using an incorrect question ID.

### Error
```text
404 - Aptitude question not found
Cause

The requested question ID did not exist in the database.

Debugging

The available question records were checked using the API.

Resolution

The test was updated to use a valid question ID.

Status

Resolved successfully.

2. Server Connection Error
Problem

API requests initially failed because the backend server was not running.

Error
Unable to connect to the remote server
Cause

The Node.js backend server was not active on port 5000.

Debugging

The backend was started using:

node server.js
Resolution

After starting the server, API requests worked successfully.

Status

Resolved successfully.

3. Jest Database Connection Warning
Problem

During an earlier test execution, Jest displayed an asynchronous operation warning related to the database connection.

Debugging

The test execution and database interaction were reviewed.

Resolution

The testing setup was reviewed and the final automated test execution completed successfully.

Final Status

All automated tests passed successfully without test failures.

4. Final Testing Verification

The final test suite was executed using:

npm test

Result:

Test Suites: 2 passed, 2 total
Tests:       28 passed, 28 total
Snapshots:   0 total
Conclusion

The identified API, server connection and testing issues were investigated and resolved or verified during Week 5.

The final automated test suite completed successfully with 28 out of 28 tests passing.