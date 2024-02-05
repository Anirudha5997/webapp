const express = require("express");
const cors = require('cors');
const appRouter = require("./routes/routes");
require('dotenv').config()
const PORT = 8000;

const app = express();
app.use(cors());
//middlewares

app.use(express.json()); // returns json body object

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

app.use("/api/v1", appRouter);