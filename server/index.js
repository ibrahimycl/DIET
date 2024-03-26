const express = require("express");
const connection = require("./config/DB");
const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');


dotenv.config();
const app = express();


app.use(cookieParser());



// database connection
connection();

// middlewares
app.use(express.json());


app.get("/",(req,res) => {
    res.send("Coding with DIET");
})
// routes
app.use("/api/user", authRoutes);
app.use("/api/package", packageRoutes);


const port = process.env.PORT || 5000;

app.listen(port, console.log(`Listening on port ${port}...`));