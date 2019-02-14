const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors")
const server = express();

const postsRouter = require("./routers/postsRouter");
const usersRouter = require("./routers/usersRouter");

//middleware: 
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));
server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);
server.use(errorHandler)

server.get("/", async (req, res) => {
    res.send(`
    <h1>Testing!</h1>
    `);
});

function errorHandler(error, req, res, next) {
    res.status(400).json({ message: "Something went wrong!", error})
}
module.exports = server; 