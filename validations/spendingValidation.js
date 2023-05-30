const { body } = require("express-validator")

module.exports = [
    body("name", "Name field is required").notEmpty(),
    body("amount", "Amount field is required").notEmpty().isNumeric(),
    body("date", "Amount field is required").notEmpty().isDate(),
    body("category", "Category field is required").notEmpty()
]