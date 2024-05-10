const express = require("express");
const connection = require("./config/DB");
const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes");
const communityRoutes = require("./routes/communityRoutes");
const foodRoutes = require("./routes/foodRoutes");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cronJob = require("./jobs/dailyJobs");


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
app.use("/api/community",communityRoutes);
app.use("/api/food",foodRoutes);

// app.use("/api/community", communityRoutes);



const port = process.env.PORT || 5000;

app.listen(port, console.log(`Listening on port ${port}...`));