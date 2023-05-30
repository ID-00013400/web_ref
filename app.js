const express = require("express")
const path = require("path")

const app = express()
const PORT = 3000

app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")))

app.get("/", (req, res) => {
    res.render("home.pug")
})

const { categoryRoutes } = require("./routes/categories.js")
const { spendingRoutes } = require("./routes/spendings.js")

app.use("/categories", categoryRoutes)
app.use("/spendings", spendingRoutes)

app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
})