# ISTQB Certivo Simulator — End-to-End Test Automation Framework

[![Playwright Tests](https://img.shields.io/badge/Playwright-1.65.1-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Architecture](https://img.shields.io/badge/Pattern-Page_Object_Model-blueviolet?style=for-the-badge)](#architecture--design-patterns)
[![MCP Enabled](https://img.shields.io/badge/AI_Assisted-MCP_Playwright-orange?style=for-the-badge)](#model-context-protocol-mcp-in-this-project)

A production-ready End-to-End (E2E) test automation suite built for the **ISTQB Certivo Simulator** web application (`http://localhost:1111`). Engineered with **Playwright**, **TypeScript**, custom **Test Fixtures**, externalized **Data Sets**, and assisted by the **Model Context Protocol (MCP)**.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Model Context Protocol (MCP) in this Project](#model-context-protocol-mcp-in-this-project)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Repository Structure](#repository-structure)
- [Test Suites Coverage](#test-suites-coverage)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Debugging & Developer Tools](#debugging--developer-tools)
- [CI/CD Pipeline](#cicd-pipeline)

---

## 🎯 Overview

This project provides automated regression and functional test coverage for the ISTQB Certivo exam preparation platform, validating core user journeys including:
- User authentication and authorization (Login / Register / Session checks).
- Hero search, catalog filtering, and certification exploration.
- End-to-end exam attempts (Practice mode & Timed Exam).
- API-intercepted submission verification (Mocking passed exam results for CTFL 40-question benchmarks).

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Playwright Test** | Fast, cross-browser automation engine with auto-waiting and web-first assertions |
| **TypeScript** | Type-safe page objects, test fixtures, and interfaces |
| **Dotenv** | Secure environment configuration management (`.env`) |
| **Model Context Protocol (MCP)** | Real-time DOM inspection, accessibility tree mapping, and AI-driven automation workflows |
| **GitHub Actions** | Automated CI pipeline with test artifact archiving (HTML reports & traces) |

---

## 🤖 Model Context Protocol (MCP) in this Project

This project leverages the **Playwright MCP (Model Context Protocol)** server to streamline test creation, debugging, and selector maintenance.

### What is MCP?
MCP is an open standard that allows AI assistants and agents to securely connect to external tools, data sources, and runtime environments. Through the **Playwright MCP Server**, the AI agent interacts directly with a live browser instance running the application.

```
┌─────────────────┐       MCP Protocol       ┌───────────────────────┐       Chrome DevTools Protocol       ┌────────────────────────┐
│   AI Assistant  │  ◄────────────────────►  │ Playwright MCP Server │  ◄────────────────────────────────►  │  Live Application      │
│   (Antigravity) │                          │ (Browser Automation)  │                                      │  (localhost:1111)      │
└─────────────────┘                          └───────────────────────┘                                      └────────────────────────┘
```

### How MCP Powers This Project:
1. **Live Accessibility Snapshots**: Instead of guessing DOM selectors from static HTML, MCP inspects the live accessibility tree (`role`, `accessible name`, `states`), ensuring resilient locators like `getByRole()` and `getByPlaceholder()`.
2. **Strict Mode Violation Prevention**: The agent identifies duplicate locators across the DOM (such as buttons duplicated across `<main>` and `<footer>`) *before* writing tests, preventing Playwright strict mode errors.
3. **Handling Complex & Hidden Elements**: Radios styled with `opacity: 0` or custom overlays were audited via MCP to determine that targeting wrapper `label.answer-option` elements guaranteed 100% click reliability.
4. **Rapid API & Network Discovery**: MCP observed live network routes during submission flows to pinpoint the exact endpoints (`/api/attempts/:id/submit`) needed for deterministic test mocking.

---

## 📐 Architecture & Design Patterns

1. **Page Object Model (POM)**:
   - UI interactions are encapsulated into reusable page classes inheriting from a shared `BasePage`.
   - Tests remain declarative and readable, containing business logic and assertions rather than raw CSS/XPath selectors.
2. **Dependency Injection via Fixtures (`src/fixtures/test.fixture.ts`)**:
   - Tests do not manually instantiate page objects with `new LoginPage(page)`.
   - Extended Playwright `test` fixtures inject ready-to-use page instances directly into test arguments.
3. **Separation of Test Data (`src/data/`)**:
   - Test data (valid users, invalid formats, validation edge cases) lives in dedicated data modules, preventing hardcoded test parameters.
4. **API Interception & Mocking**:
   - Utilizes `page.route()` to mock exam results for determinism, bypassing the need to score 40 dynamic questions live to verify the "Passed" results UI.

---

## 📂 Repository Structure

```
.
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI workflow
├── src/
│   ├── data/
│   │   ├── index.ts                # Barrel export for all test data
│   │   ├── login.data.ts           # Login payloads (valid, invalid, edge cases)
│   │   └── register.data.ts        # Registration datasets & validation values
│   ├── fixtures/
│   │   └── test.fixture.ts         # Custom test fixtures with injected POM pages
│   ├── pages/
│   │   ├── base.page.ts            # Common navigation and synchronization logic
│   │   ├── standard-layout.page.ts # Shared layout (header, navigation, footer)
│   │   ├── home.page.ts            # Landing page & hero search interactions
│   │   ├── catalog.page.ts         # Certification listings & catalog cards
│   │   ├── catalog-details.page.ts # Certification detail view & mode selection
│   │   ├── attempt.page.ts         # Exam runner (questions, options, navigation)
│   │   ├── results.page.ts         # Results screen (score cards, pass/fail status)
│   │   ├── login.page.ts           # Login form, inputs, and validation
│   │   └── register.page.ts        # Registration form and password hints
│   └── utils/                      # Helper functions and shared utilities
├── tests/
│   ├── login.spec.ts               # Login page test suite (11 tests)
│   ├── register.spec.ts            # Registration test suite (9 tests)
│   ├── exam-attempt.spec.ts        # Exam execution & mock passing flows (2 tests)
│   └── search-and-practice.spec.ts # Discovery & catalog navigation (3 tests)
├── .env                            # Local environment variables (ignored by git)
├── package.json                    # Project dependencies and test scripts
├── playwright.config.ts            # Multi-browser setup, timeouts, reporter configs
└── tsconfig.json                   # TypeScript compiler configuration
```

---

## 🧪 Test Suites Coverage

| Suite | Spec File | Key Scenarios Covered |
| :--- | :--- | :--- |
| **Login** | `tests/login.spec.ts` | Page load, valid credentials, invalid credentials, empty submissions, HTML5 constraint validations, password toggle visibility, registration link navigation |
| **Register** | `tests/register.spec.ts` | Form rendering, successful registration, password length constraints (>=12 chars), invalid emails, login link navigation |
| **Search & Practice** | `tests/search-and-practice.spec.ts` | Hero search filtering, navigation to certification catalog, selecting practice mode |
| **Exam Flow** | `tests/exam-attempt.spec.ts` | Answering exam questions, navigating between items, finishing practice sessions, API route mocking to verify the celebration screen on passing score |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: version `18.x` or higher
- **Application Target**: Ensure the ISTQB Simulator is running locally at `http://localhost:1111` (or update `.env`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd istqb-simulator-e2e
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install --with-deps
   ```

4. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   BASE_URL=http://localhost:1111
   TEST_USER_EMAIL=lakhlifi@gmail.com
   TEST_USER_PASSWORD=L@khlifi1997
   SLOWMO=0
   ```

---

## 💻 Running Tests

```bash
# Run all tests headlessly across configured browsers
npm test

# Run tests on Chromium only
npx playwright test --project=chromium

# Run a specific test suite
npx playwright test tests/login.spec.ts

# Run tests in headed browser mode
npx playwright test --headed

# Open the interactive Playwright UI Mode
npx playwright test --ui
```

---

## 🔍 Debugging & Developer Tools

Playwright provides three built-in tools used extensively throughout this framework:

### 1. Playwright Codegen
Record manual interactions to scaffold new page objects:
```bash
npx playwright codegen http://localhost:1111
```

### 2. Playwright Inspector
Pause execution and step through actions line by line:
```bash
PWDEBUG=1 npx playwright test tests/login.spec.ts
```
*(Or insert `await page.pause()` directly inside any test or page method).*

### 3. Trace Viewer
Inspect the full timeline, network requests, console logs, and before/after DOM snapshots of failed tests:
```bash
# View the HTML test report with embedded traces
npx playwright show-report

# Open a specific trace zip archive
npx playwright show-trace test-results/<run-dir>/trace.zip
```

---

## ⚙️ CI/CD Pipeline

The framework is configured with **GitHub Actions** (`.github/workflows/playwright.yml`) which automatically runs on all pushes and pull requests against `main`/`master`:

- Sets up Ubuntu environment with Node.js LTS.
- Caches and installs dependencies with `npm ci`.
- Runs Playwright tests with auto-retry and tracing on failure.
- Publishes the **Playwright HTML Report** and failure traces as workflow artifacts for 30 days.
