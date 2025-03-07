const express = require("express");
const dbConnect = require("./Config/db");
const userRouter = require("./Routes/user.route");
const movieRouter = require("./Routes/movie.route");
const showRouter = require("./Routes/show.route");
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);
app.use("/api/show", showRouter);

app.listen(8090, () => {
    console.log("Server is running on port 8090");
    dbConnect
})