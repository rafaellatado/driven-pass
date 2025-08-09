# Deploy Link: https://driven-pass-m91b.onrender.com

# 🚀 How to Test the DrivenPass API

## 🔓 1. Health Check
Verifies if the API is online.

GET /health

Expected response:
200 OK

"I'm OK!"

## 👤 2. User Registration

POST /sign-up

Body:
{
  "name": "Your Name",
  "email": "email@example.com",
  "password": "password123",
  "confirmPassword": "123456"
}

## 🔑 3. User Login

POST /sign-in

Body:
{
  "email": "email@example.com",
  "password": "password123"
}

Expected response:
200 OK with JWT token in the body.
You will use this token in subsequent authenticated requests.

## 🔐 4. Create Credential

POST /credentials
Authorization: Bearer {TOKEN}

Body:
{
  "title": "Facebook",
  "url": "https://facebook.com",
  "username": "driven_user",
  "password": "dr1VenP@ss"
}

## 📄 5. Get Credentials

PostgreSQL & PL/pgSQL

GET /credentials
Authorization: Bearer {TOKEN}

## 📄 5.2. Get Credentials by ID

PostgreSQL & PL/pgSQL

GET /credentials/id
Authorization: Bearer {TOKEN}

## ✏️ 6. Update a Credential

PUT /credentials/{id}
Authorization: Bearer {TOKEN}

Body:
{
  "title": "New Facebook",
  "url": "https://facebook.com",
  "username": "new_user",
  "password": "newPassword123"
}

## ❌ 7. Delete a Credential

DELETE /credentials/{id}
Authorization: Bearer {TOKEN}

## 🧨 8. Delete Account

PostgreSQL & PL/pgSQL

DELETE /erase
Authorization: Bearer {TOKEN}

## 🧪 Demo User

You can use this user for quick testing:

{
  "email": "demo@driven.com.br",
  "password": "demo123"
}