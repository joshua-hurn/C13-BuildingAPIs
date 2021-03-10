const express = require('express');
const app = express();
const apiRouter = require("./routes");

// parse JSON so I can use in chirps.js
app.use(express.json());

// parse form data so I can use in chirps.js
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use(express.static("client"));

app.listen(3000);