# Bankin Backend (Spring Boot + Spring Data JPA + PostgreSQL)

REST API backend for the `bankin-m3-project` React app. Built as a layered
application: **Controller → Service → DAO → Repository**, with a dedicated
**Exception** layer and **DTOs** for request validation. No Spring Security
(per requirements) - all endpoints are open.

### Design notes specific to this version

- **No configuration classes.** CORS is set with `@CrossOrigin` directly on
  each `@RestController` instead of a separate `WebMvcConfigurer` bean.
- **No `BigDecimal`.** All monetary fields use `double`.
- **No enums.** Types like account type, loan status, and transaction type
  are plain `String`s, same as the JSON the frontend already sends.
- **No `ApiError` class.** Every response - success or failure - uses one
  generic envelope: `ApiResponse<T>` (`statusCode`, `message`, `data`).
- **No DAO/Service interfaces.** `UserDao`, `AccountDao`, `UserService`,
  `AccountService`, etc. are plain, concrete classes - no `XyzService`
  interface + `XyzServiceImpl` split.
- **Response building lives in the service layer.** Every service method
  returns `ResponseEntity<ApiResponse<T>>` directly. Controllers just call
  the service method and return its result - no `ResponseEntity` is built
  in the controller layer. `GlobalExceptionHandler` follows the same rule:
  every handler returns `ResponseEntity<ApiResponse<Object>>`.

## 1. Prerequisites

- Java 17+
- Maven 3.8+
- PostgreSQL 13+ running locally

## 2. Database setup

```sql
CREATE DATABASE bankin_db;
```

Tables are auto-created/updated on startup (`spring.jpa.hibernate.ddl-auto=update`
in `application.properties`). Update the username/password/URL in
`src/main/resources/application.properties` to match your local Postgres.

## 3. Run

```bash
cd bankin-backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080**.

## 4. Point the React app at this API

The React app currently calls `http://localhost:3000` (json-server) directly
inside each component (`axios.get('http://localhost:3000/accounts')`, etc).
To use this backend instead, either:

- Run this app on port 3000 (change `server.port` in `application.properties`), **or**
- Find-and-replace `http://localhost:3000` → `http://localhost:8080` across `src/`.

Every endpoint below matches the existing axios calls exactly (including the
`/tranctions` path, which mirrors a typo already present in the frontend), so
**no other frontend code changes are required** for the app to function.

## 5. API Reference

### Auth / Users - `/register`
| Method | Path | Used by | Notes |
|---|---|---|---|
| GET | `/register` | `Login.jsx` | Returns all users (incl. password) so the existing client-side match keeps working |
| GET | `/register/{id}` | - | Fetch one user |
| POST | `/register` | `Register.jsx` | Create a user. 409 if email already exists |
| POST | `/login` | *(new, optional)* | Server-validated login. Recommended upgrade path for `Login.jsx` |

### Accounts - `/accounts`
| Method | Path | Used by | Notes |
|---|---|---|---|
| GET | `/accounts` | `Accounts.jsx`, `Loans.jsx`, `Fd.jsx`, `Rd.jsx` | List all |
| GET | `/accounts?AccountNumber=123` | `AccountCard.jsx` (transfer) | Lookup by account number |
| GET | `/accounts/{id}` | `CreateAccount.jsx` | Lookup by primary key |
| POST | `/accounts` | `CreateAccount.jsx` | Creates account; auto-generates a unique 12-digit `AccountNumber` if omitted |
| PATCH | `/accounts/{id}` | `AccountCard.jsx` | Raw balance patch (`{ "InitialBalance": 1234 }`) - kept for parity |
| DELETE | `/accounts/{id}` | `AccountCard.jsx` | Deletes the account and all related transactions |
| POST | `/accounts/{id}/deposit` | *(new, optional)* | `{ amount, description }` - validated, atomic |
| POST | `/accounts/{id}/withdraw` | *(new, optional)* | Validated, rejects if balance insufficient |
| POST | `/accounts/{id}/transfer` | *(new, optional)* | Validated, atomic transfer between two accounts |

### Transactions - `/tranctions`
| Method | Path | Used by |
|---|---|---|
| GET | `/tranctions` | `Transactions.jsx` |
| POST | `/tranctions` | `AccountCard.jsx` (deposit/withdraw/transfer) |
| DELETE | `/tranctions/{id}` | `AccountCard.jsx` (account deletion cascade) |

### Fixed Deposits - `/fd`
| Method | Path | Used by |
|---|---|---|
| GET | `/fd` | `Fd.jsx` |
| POST | `/fd` | `Fd.jsx` - rejects if account doesn't exist or already has an FD |

### Recurring Deposits - `/rd`
| Method | Path | Used by |
|---|---|---|
| GET | `/rd` | `Rd.jsx` |
| POST | `/rd` | `Rd.jsx` - server recalculates `InterestRate`/`MaturityAmount` |

### Loans - `/loans`
| Method | Path | Used by |
|---|---|---|
| GET | `/loans` | `Loans.jsx` |
| POST | `/loans` | `Loans.jsx` - server recalculates rate, EMI, and approval status |
| PATCH | `/loans/{id}/status` | *(new)* | For the README's planned "repayment"/status-update button |
| DELETE | `/loans/{id}` | *(new)* | For the README's planned "delete loan" button |

## 6. Response format

Every response - success or error - uses the same envelope, `ApiResponse<T>`:

```json
// success (e.g. GET /accounts/1)
{
  "statusCode": 200,
  "message": "Account fetched successfully",
  "data": { "id": 1, "AccountNumber": 736455907700, "AccName": "madhu", "Acctype": "Savings", "InitialBalance": 7000.0 }
}

// error (e.g. GET /accounts/999)
{
  "statusCode": 404,
  "message": "Account not found with id: 999",
  "data": null
}
```

## 6a. Frontend impact of the `ApiResponse` wrapper

Because every response is now wrapped, the payload the React app expects has
moved from `res.data` to `res.data.data`. For example, `Accounts.jsx` today does:

```js
axios.get('http://localhost:3000/accounts').then((res) => setAccounts(res.data))
```

Against this backend, that needs to become:

```js
axios.get('http://localhost:8080/accounts').then((res) => setAccounts(res.data.data))
```

This applies everywhere the frontend reads `res.data` as the account/loan/
transaction/FD/RD list or object. This is the one frontend change the
`ApiResponse` wrapper requires - everything else (paths, request bodies,
JSON field names) stays exactly as-is.

## 7. Known frontend quirk (not a backend bug)

`CreateAccount.jsx` checks account-number uniqueness with
`GET /accounts/{randomNumber}` — but that endpoint looks up by primary key
`id`, not `AccountNumber`, so the check is effectively a no-op on the
frontend today (same behavior it had against the original json-server mock).
The backend already guarantees uniqueness server-side regardless (see
`AccountService.createAccount`), so accounts still never collide - this note
is just so you're not surprised by that GET call's real behavior if you go
looking for it.

## 8. Security note

Per project requirements, **Spring Security is intentionally excluded**.
Passwords are stored and compared in plain text, exactly like the original
`db.json` mock data. Do not deploy this as-is beyond local development.
