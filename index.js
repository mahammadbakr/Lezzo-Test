const express = require("express");
var bodyParser = require('body-parser')
require('dotenv').config({ path: './.env' });

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Initial route
app.get("/", (req, res) => {
  res.json({ message: "Lezzo Test" });
});

require("./Routes/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port:"+PORT);
});