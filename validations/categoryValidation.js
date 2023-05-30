const { body } = require("express-validator")

module.exports = [
    body("name", "Name field is required").notEmpty()
]