# CyberLab - BScThesis

Educational application for learning and testing web vulnerabilities (XSS, CSRF, SQL Injection, Phishing, Open Redirect) and methodologies for them with a Interactive Penetration Test module.

## Project Purpose
This project was created as part of a BSc thesis. It allows users to:
- Learn about common web vulnerabilities
- Perform penetration tests in a safe environment
- Practice identifying and fixing security issues

## Technologies
- **Frontend:** React, Sass, MUI, Swiper
- **Backend:** Node.js, Express, SQLite
- **Docker** (for running the whole stack)
- **ESLint + security plugins** (static analysis)
- **Jest** (backend unit tests)

## Running the Project

### 1. Using Docker (recommended)
```bash
# In the root directory
docker-compose up --build
```
Frontend: http://localhost:3000  
Backend API: http://localhost:8000

### 2. Locally (development)
#### Backend
```bash
cd backend
npm install
npm start
```
#### Frontend
```bash
cd frontend/cyberlab
npm install
npm start
```

## Testing
### Security Tests
- Automatic code analysis with ESLint and plugins:
  - `eslint-plugin-security`
  - `eslint-plugin-no-secrets`
  - `eslint-plugin-sonarjs`
- HTML reports with detected vulnerabilities (frontend and backend)

### Unit Tests (backend)
- Framework: Jest
- Example tests for all controllers:
  - Check if the controller exports functions
  - Run:
    ```bash
    cd backend
    npx jest controller
    ```

## Project Structure
```
backend/
  controller/
    csrfController.js
    pentestController.js
    redirectController.js
    sqlInjectionController.js
    xssController.js
    ...
  routes/
  server.js
  database.js
frontend/
  cyberlab/
    src/
      components/
      assets/
      ...
    Dockerfile
    ...
docker-compose.yml
README.md
```

## Author
Szymi611

