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

## .env
.env file must be created at root directory of the project with the following params:
- `PORT=3333`
- `DB_URI=<mongo db connection uri>`
- `ACCESS_TOKEN_SECRET=<alpha numeric string hash>`

---

## 📮 Postman Collection

Test all APIs using this Postman collection:  
👉 [Open Postman Collection](https://.postman.co/workspace/My-Workspace~831d7cc1-0b4f-4833-82c1-8208672b411a/collection/1462216-d20188c3-2521-49ef-84cc-e5334fbf36c8?action=share&creator=1462216)

---

## ⚙️ Required technologies
These techs must be insalled and in running position of OS:
- `NodeJS`
- `Mongo DB`
