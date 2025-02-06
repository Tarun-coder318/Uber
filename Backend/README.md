# API Documentation

## Endpoints

### POST /users/register

## Endpoint: `/users/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### Request Body:
The request body should be a JSON object containing the following fields:
- `fullname`: An object containing:
  - `firstname`: The user's first name (minimum 3 characters, required)
  - `lastname`: The user's last name (minimum 3 characters, optional)
- `email`: The user's email address (must be a valid email, required)
- `passward`: The user's password (minimum 6 characters, required)

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "passward": "password123"
}
```

### Responses:

#### Success:
- **Status Code: 201**
- **Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Validation Errors:
- **Status Code: 400**
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Name must be at least 3 characters",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters",
        "param": "passward",
        "location": "body"
      }
    ]
  }
  ```

#### Missing Fields:
- **Status Code: 400**
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "All fields are required"
      }
    ]
  }
  ```

### Notes:
- Ensure that the `passward` field is hashed before storing it in the database.
- A JWT token is generated upon successful registration and returned in the response.

### POST /users/login

**Description:** User login.

**Request Body:**
- `email` (String): User's email.
- `password` (String): User's password.

**Responses:**

- **Success:**
  - **Status Code:** 200
  - **Body:**
    ```json
    {
      "token": "string",
      "user": {
        "id": "string",
        "email": "string",
        "fullname": {
          "firstname": "string",
          "lastname": "string"
        }
      }
    }
    ```

- **Error:**
  - **Status Code:** 400
  - **Body:**
    ```json
    {
      "message": "string"
    }
    ```
