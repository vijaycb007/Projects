# Mysuru City Bank — Fullstack Banking System

A fullstack banking application built with **Java + Spring Boot + PostgreSQL** (backend) and **React + Vite + Tailwind CSS** (frontend), embedded into a single deployable Spring Boot application.

---

## Tech Stack

- **Backend:** Spring Boot 3, Java 17, Spring Data JPA, PostgreSQL
- **Frontend:** React, Vite, Tailwind CSS v4
- **Build:** Maven (`frontend-maven-plugin` builds the React app and copies it into `src/main/resources/static`)
- **Database:** PostgreSQL

---

## Prerequisites

- JDK 17
- Maven (or use STS's bundled Maven)
- PostgreSQL installed and running
- pgAdmin (or any PostgreSQL client)
- Spring Tool Suite (STS) or any Eclipse-based IDE with Spring support
- Node.js is **not required manually** — the Maven build downloads and installs a local Node/npm automatically via `frontend-maven-plugin`.

---

## Setup Instructions

### 1. Create the Database

1. Open **pgAdmin**.
2. Connect to your local PostgreSQL server.
3. Right-click **Databases** → **Create** → **Database**.
4. Name it:
   ```
   bankin_db
   ```
5. Click **Save**.

### 2. Configure Database Connection

Open `src/main/resources/application.properties` and set your local PostgreSQL credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/bankin_db
spring.datasource.username=<your_postgres_username>
spring.datasource.password=<your_postgres_password>

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

> `ddl-auto=update` 
lets Hibernate auto-create/update tables on startup — no manual schema setup needed.

### 3. Import the Project into STS

1. Open **Spring Tool Suite (STS)**.
2. `File` → `Import` → `Maven` → `Existing Maven Projects`.
3. Select the project root folder (where `pom.xml` is located).
4. Wait for Maven to resolve dependencies.

### 4. Run the Application

The frontend is embedded into the backend build — you only need to run **one** application.

1. Right-click the project in STS.
2. `Run As` → `Maven build...`
3. In the **Goals** field, type:
   ```
   clean install
   ```
4. Click **Run**.

   This will:
   - Install a local Node.js/npm (isolated, doesn't affect your system Node).
   - Run `npm install` inside `src/main/frontend`.
   - Run `npm run build`, which outputs the compiled React app into `src/main/resources/static`.
   - Package everything into the Spring Boot jar.

5. Once the build succeeds, right-click the project again → `Run As` → `Spring Boot App`.

6. Open your browser and go to:
   ```
   http://localhost:8080
   ```

The React frontend and Spring Boot backend now run together on port `8080` — no separate frontend dev server needed.

---

## Project Structure

```
bankin-backend/
├── src/main/java/com/jsp/backend/       # Spring Boot backend source
│   ├── controller/
│   ├── dao/
│   ├── dto/request/
│   ├── dto/response/
│   ├── entity/
│   ├── exception/
│   └── repository/
├── src/main/resources/
│   ├── static/                          # Compiled React build output (generated)
│   └── application.properties
├── src/main/frontend/                   # React source
│   ├── src/
│   │   ├── Components/
│   │   ├── pages/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
└── pom.xml
```

---

## Notes

- Do **not** run the frontend separately with `npm run dev` for production/demo use — it's embedded into the Spring Boot build. Use `npm run dev` only if you're actively developing frontend UI in isolation and don't need backend calls to resolve.
- If you make frontend changes, you must re-run `clean install` (or at least the `generate-resources` phase) for them to appear at `localhost:8080` — a browser refresh alone will not pick up new frontend code unless you rebuild.
- If the build fails with a Node/npm error, delete `src/main/frontend/node_modules` and `package-lock.json`, then rebuild — this clears stale or corrupted dependency installs.

---

## Author

Vijay C B — Java Full Stack Developer 
---
[LinkedIn](https://www.linkedin.com/in/vijay-c-b-28022004v/) | [Portfolio](https://vijaycb-site.vercel.app/)
---
