// express packages
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
// sequelize packages
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// other packages or imports
const controllers = require("./controllers");
const helpers = require("./utils/helpers");
const path = require("path");
require("dotenv").config();

// server variables
const app = express();
const PORT = process.env.PORT || 3001;

// session variables and setup
// const sesh = {
//   secret: process.env.SESH_SEC,
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };
// app.use(session(sesh));

// setup handlebars
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// server setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(controllers);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now Listening"));
});
