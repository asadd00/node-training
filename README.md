# 🔐 Auth Module

A basic authentication module built with **Node.js** and **MongoDB**, providing user registration, login, and access to a protected user profile.

---

## 📌 API Endpoints

### 📝 Register
**URL:** `POST /api/auth/register`  
**Description:** Registers a new user.

#### Required Body Parameters:
- `name` (string)
- `username` (string)
- `password` (string)
- `confirm_password` (string)

---

### 🔑 Login
**URL:** `POST /api/auth/login`  
**Description:** Logs in a user and returns an access token.

#### Required Body Parameters:
- `username` (string)
- `password` (string)

---

### 🙋‍♂️ User Profile (Protected)
**URL:** `GET /api/auth/user-profile`  
**Description:** Retrieves logged-in user's profile.  
**Note:** This route is **protected** and requires a token.

#### Headers:
- `Authorization: Bearer <access_token>`

---

## 📮 Postman Collection

Test all APIs using this Postman collection:  
👉 [Open Postman Collection](https://.postman.co/workspace/My-Workspace~831d7cc1-0b4f-4833-82c1-8208672b411a/collection/1462216-d20188c3-2521-49ef-84cc-e5334fbf36c8?action=share&creator=1462216)

---

## Prequsites

- `NodeJS` must be installed and running
- `MongoDB` must be installed and running

## Env

- create `.env` file at root directory of the project and add following variables in it;
- `PORT=3333`
- `DB_URI=<your mongodb connection URI>`
- `DB_NAME=<your db name>`
- `ACCESS_TOKEN_SECRET=<any string hash you want>`
- `REFRESH_TOKEN_SECRET=<any string hash you want>`
