const express = require("express");
const connection = require("./config/DB");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// database connection
connection();

// middlewares
app.use(express.json());


app.get("/",(req,res) => {
    res.send("Coding with DIET");
})
// routes
app.use("/api/user", authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Listening on port ${port}...`));