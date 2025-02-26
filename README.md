# I used Pius' backend boilerplate with some small modifications.

# Here is his README.md :


# 📦 Backend Boilerplate With Express.js - Typescript - Sequelize

This is a simple boilerplate with **Express.js** with a ready-to-use configuration for backend development. You can adjust it according to your requirements.

---

## ✨ Features
- ⚡ [**Express.js**](https://expressjs.com/) as the backend framework
- 📋 [**Swagger**](https://swagger.io/docs/) for API documentations
- 🛠 [**Typescript**](https://www.typescriptlang.org/docs/) for strong type support
- 📄 **Linting** with [**ESlint**](https://eslint.org/docs/latest/) and [**Prettier**](https://prettier.io/docs/en/)

---

## 🚀 Prerequisite

Make sure you have installed the following tools:

- **Node.js** >= v18.x.x
- **npm**

---

## 📥 Installation

1. Clone repository:

   ```bash
   git clone https://github.com/pius706975/express-typescript-sequelize-boilerplate.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create `.env.development` to store the environment configuration:

   ```bash
   .env.development
   ```

4. Fill the `.env.development` file based on your requirements:

   ```
    PORT = port number
    NODE_ENV = env
    BASE_URL = base url

    DB_PORT = db port
    DB_USERNAME = db username
    DB_PASSWORD = db password
    DB_NAME = db name
    DB_HOST = host
    DB_DIALECT = dialect

    JWT_ACCESS_TOKEN_SECRET = JWT secret
   ```

## 🏃 Run the server and the test

Run the server in the development mode:

```bash
npm run dev
```

Or in the production mode

```bash
npm start
```

Run the test:
- Test all function
   ```bash
   npm run test
   ```
- Test by selecting the file
   ```bash
   npm run test path-to-your-test-file/file.test.ts
   ```
---

## 🛠 Additional

- **Linting and code formatting:**

  ```bash
  npm run lint      # Linting check
  npm run lint:fix  # Formatting code with prettier
  ```

- **Creating DB table:**

  ```bash
  npm run migration:generate --name "create-table-name"
  ```
---

## 📚 API Documentation

Access swagger documentations: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

Swagger will automatically return the documentations based on route file annotation.

---

## 📂 Project structure

Let's have a look at this structure:

```
├── /node_modules
├── /src
│   ├── /config          # Base configuration such as .env key and sequelize-cli configuration
│   ├── /database
│   │   ├── /migrations  # DB migration files to migrate our DB tables
│   │   └── /models      # DB model files that will be used in the development
│   ├── /docs            # Swagger documentations
│   ├── /interfaces      # Interfaces
│   ├── /logs            # Access logs
│   ├── /middleware      # App middlewares
│   ├── /modules         # App modules
│   │   ├── /auth        #
│   │   ├── /user        # These module directories will store repo, service, controller, routes, and validator files.
│   │   └── /etc         #
│   ├── /routes          # Main route file that store all of the module routes
│   ├── /types           # typescript support
│   ├── /utils           # Utils
│   └── server.js        # Entry point of the app
├── /tests               # Unit test main folder
│   ├── /middleware      # Middleware tests
│   ├── /modules         # Modules tests
├── .env.development     # Development environment variables
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

---

## 🔗 The example of API Request

**POST** a request to `/api/example`:

```bash
curl --request POST   --url http://localhost:5000/api/auth/signup
```

Response:

```json
{
    "message": "Successfully signed up"
}
```

---

## 👨‍💻 Contributor

- Pius Restiantoro - [GitHub](https://github.com/pius706975)
