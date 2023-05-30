const express = require("express")
const { validationResult } = require("express-validator");
const DataManager = require("../managers/DataManager")

const router = express.Router()

const categoryValidation = require("../validations/categoryValidation");

const CategoriesManager = new DataManager("categories")

router.get("/", (req, res) => {
    const saved = req.query.saved;
    const deleted = req.query.deleted;
    const categories = CategoriesManager.getAll()
    res.render("categories/categoriesList", { saved, categories, deleted })
});

router.get("/create", (req, res) => {
    let category = {}
    res.render("categories/categoryForm", { category })
})

router.get("/:category/edit", (req, res) => {
    const category = CategoriesManager.find(req.params.category)
    if (category) return res.render("categories/categoryForm", { category })
    res.redirect("/categories")
})

router.post('/:category/delete', (req, res) => {
    const category = CategoriesManager.delete(req.params.category)
    res.redirect("/categories?deleted=1")
})

router.post("/form", categoryValidation, (req, res) => {

    let validation = validationResult(req)

    if (!validation.isEmpty()) {
        res.render("categories/categoryForm", { category: {}, errors: JSON.stringify(validation.errors) })
    }

    const id = req.body.id

    const category = {
        name: req.body.name
    }

    id ? CategoriesManager.update(id, category) : CategoriesManager.insert(category)

    res.redirect("/categories?saved=1")
})


module.exports = { categoryRoutes: router }