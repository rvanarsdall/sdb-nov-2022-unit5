// TODO: Ability to CRUD todo's and save them somewhere
const router = require("express").Router()
const db = require("../assets/db.json")
const fs = require("fs")
const { Z_FIXED } = require("zlib")
const dbPath = "./assets/db.json"

router.get("/", (req, res) => {
    try {
        res.status(200).json({
            db
        })
    } catch (err) {
        res.status(500).json({
            status: `Error: ${err}`
        })
    }
})

router.get("/:id", (req, res) => {
    try {
        let { id } = req.params
        let result = db.filter(i => i.todo_id == id)

        res.status(200).json({
            status: `Found item at id: ${id}`,
            result
        })
    } catch (err) {
        res.status(500).json({
            error: `${err}`
        })
    }
})
// TODO: POST a todo

router.post("/", (req, res) => {
    try {
        const todoItem = req.body
        console.log(todoItem)
        fs.readFile(dbPath, (err, data) => {
            if (err) throw err
            const db = JSON.parse(data)
            db.push(todoItem)
            fs.writeFile(dbPath, JSON.stringify(db), (err) => console.log(err))
        })

        res.status(201).json({
            status: "New item created",
            todoItem
        })
    } catch (err) {
        console.log(err)
    }
})

// TODO: Update a todo

// TODO: Delete a todo

module.exports = router