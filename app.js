const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')

const port = 5050

// middleware
app.use(cors())
app.use(express.json())

// routes (create todo, get, get all, update, delete)
app.post("/todos", async (req, res) => {
    try {
        const { descr } = req.body
        const newTodo = await pool.query("INSERT INTO todo (descr) VALUES ($1) RETURNING *", [descr])
        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = ($1)", [id])
        res.json(todo.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * from todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { descr } = req.body
        const updateTodo = await pool.query("UPDATE todo SET descr = $1 WHERE todo_id = $2", [descr, id])
        res.json("updateTodo")
    } catch (err) {
        console.error(err.message)
    }
})

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("Todo deleted")
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(port, () => {
    console.log(`Server listen in port ${port}`)
})