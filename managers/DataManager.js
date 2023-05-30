const fs = require("fs")
const uniqid = require("uniqid")
const path = require("path")

module.exports = class {
    constructor(file) {
        this.file = file
        this.filePath = path.join(__dirname, `../data/${file}.json`)
    }

    insert(data) {
        data.id = uniqid()
        let collection = this.getAll()
        collection.push(data)
        fs.writeFileSync(this.filePath, JSON.stringify(collection))
        return data
    }

    update(id, data) {
        const collection = this.getAll()
        const itemIndex = collection.findIndex(item => item.id == id)
        console.log(id);
        if (itemIndex < 0) return
        data.id = id
        collection[itemIndex] = data
        fs.writeFileSync(this.filePath, JSON.stringify(collection))
        return data
    }

    getAll() {
        const collection = fs.readFileSync(this.filePath)
        return JSON.parse(collection)
    }

    find(id) {
        const collection = this.getAll()
        const item = collection.find((item) => item.id == id)
        return item
    }

    delete(id) {
        let collection = this.getAll()
        collection = collection.filter((item) => item.id != id)
        fs.writeFileSync(this.filePath, JSON.stringify(collection))
        return id
    }
}