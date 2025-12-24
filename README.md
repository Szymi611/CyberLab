
# CyberLab – Educational Pentesting Platform
> An interactive educational application for learning and testing web vulnerabilities (XSS, CSRF, SQL Injection, Phishing, Open Redirect). BSc Thesis Project 2025.

---

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Quick Start](#quick-start)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Methodologies](#methodologies)
- [Author](#author)
- [License](#license)
- [FAQ](#faq)

---


## Description
CyberLab is an educational platform designed to help users learn and practice the most common web application vulnerabilities. The platform provides a safe environment for performing attacks, solving interactive quizzes, and exploring real-world pentesting methodologies. It is suitable for students, security enthusiasts, and anyone interested in web application security.

The project also includes a dedicated section on pentesting methodologies, offering theoretical background and practical guidance for conducting penetration tests in a structured and ethical manner.


## Features
- Vulnerability simulations: **XSS**, **CSRF**, **SQL Injection**, **Phishing**, **Open Redirect**
- Interactive quizzes and practical tasks
- Security reports (ESLint)
- Example pentesting scenarios
- Built-in pentesting methodologies section
- Run the whole stack with Docker or locally


## Technologies
- **Frontend:** React, Sass, MUI, Swiper
- **Backend:** Node.js, Express, SQLite
- **Docker** (for running the entire stack)
- **ESLint** (static code security analysis)
- **Jest** (backend unit tests)


## Quick Start

### 1. Using Docker (recommended)

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)

### 2. Local Development

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
- Example tests for all controllers
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
README.md
```

## Methodologies

The platform includes a dedicated section on pentesting methodologies, accessible from the main menu. This section covers:
- Theoretical background of penetration testing
- Step-by-step guides for conducting web application pentests
- Best practices and ethical guidelines
- References to industry standards (e.g., OWASP Testing Guide)

You can find the implementation in:
- `frontend/cyberlab/src/components/Methodologies/`


## Author
Szymon "Szymi611" (BSc Thesis 2025)

## License
This project is provided for educational purposes only.

## FAQ

**1. Docker startup does not work.**
- Make sure you have Docker and Docker Compose installed.
- Check if ports 3000 and 8000 are free.

**2. How to add your own vulnerability scenarios?**
- Add a new controller in `backend/controller/` and the corresponding route in `backend/routes/`.
- Add a quiz or task in `frontend/cyberlab/src/assets/content/`.

**3. How to run security tests?**
- In the frontend/backend directory, run ESLint:
  ```bash
  npx eslint . --format html -o eslint-report.html
  ```

---

