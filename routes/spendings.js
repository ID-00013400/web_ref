const express = require("express")
const { validationResult } = require("express-validator")
const DataManager = require("../managers/DataManager")
const spendingValidation = require("../validations/spendingValidation")

const router = express.Router()

const SpendingsManager = new DataManager("spendings")
const CategoriesManager = new DataManager("categories")

router.get("/", (req, res) => {
    const spendings = SpendingsManager.getAll()
    const categories = CategoriesManager.getAll()

    const saved = req.query.saved
    const deleted = req.query.deleted

    spendings.map((spending) => spending.category = categories.find((category) => category.id == spending.category)?.name)

    res.render("spendings/spendingsList", { spendings, saved, deleted })
})

router.get("/create", (req, res) => {
    const categories = CategoriesManager.getAll()
    res.render("spendings/spendingForm", { spending: {}, categories })
})

router.get("/:spending/edit", (req, res) => {
    const categories = CategoriesManager.getAll()
    const spending = SpendingsManager.find(req.params.spending)
    if (!spending) return res.redirect("/spendings")
    res.render("spendings/spendingForm", { spending, categories })
})

router.post("/:spending/delete", (req, res) => {
    SpendingsManager.delete(req.params.spending)
    res.render("/spendings?deleted=true")
})

router.post("/form", spendingValidation, (req, res) => {
    let validation = validationResult(req)

    if (!validation.isEmpty()) {
        const categories = CategoriesManager.getAll()
        return res.render("spendings/spendingForm", { spending: req.body, categories, errors: JSON.stringify(validation.errors) })
    }

    const id = req.body.id

    const spending = {
        name: req.body.name,
        category: req.body.category,
        amount: req.body.amount,
        date: req.body.date,
        description: req.body.description
    }

    id ? SpendingsManager.update(id, spending) : SpendingsManager.insert(spending)

    res.redirect("/spendings?saved=1")
})

module.exports = {
    spendingRoutes: router
}