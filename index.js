const express = require("express");
require('dotenv').config({ path: './.env' });

const app = express();

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



