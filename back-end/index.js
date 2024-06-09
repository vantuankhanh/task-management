require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const socket = require("socket.io");

const authRoute = require("./src/routes/auth.routes");
const pageAuth = require("./src/routes/page.routes");

const app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/auth", authRoute);
app.use("/api/", pageAuth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = app.listen(process.env.PORT || "4000", () => {
  console.log(`App 🖥️  is running ❤️  on port:: ${process.env.PORT || "4000"}`);
});

const io = socket(server, {
  cors: {
    origin: process.env.APP_URL,
  },
});

var currentUsers = {};

io.on("connection", (socket) => {
  socket.on("connectServer", (employeeId) => {
    console.log(`Employee ${employeeId} has connected`);
    currentUsers[employeeId] = socket.id;
  });

  socket.on("sendMessage", ({ to, message }) => {
    const sender = currentUsers[to];
    if (sender) {
      socket.to(sender).emit("receiveMessage", message);
    }
  });

  socket.on("disconnect", ({ employeeId }) => {
    console.log(`Employee ${employeeId} has disconnected`);
  });
});
