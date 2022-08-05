const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
const usersRouter = require("./src/routers/users");
const filmRouter = require("./src/routers/films");
const bookRouter = require("./src/routers/books");

// ADD ROUTERS TO APP
app.use("/users", usersRouter);
app.use("/films", filmRouter);
app.use("/books", bookRouter);

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
