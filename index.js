

const express = require('express')
const cors = require('cors')


const database = require('./database')
const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // parsing

const PORT = process.env.PORT || 4000
app.listen(PORT)

app.get('/users', async (req, res) => {
    try {
        const users = await database.getUsers();
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})
app.get('/users/:id', async (req, res) => {
    try {
        const user = await database.getUserById(req.params.id);
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})
app.post('/users', async (req, res) => {
    try {
        await database.createUser(req.body);
        console.log("User added successfully")
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})
app.put('/users/:id', async (req, res) => {
    try {
        const user = await database.updateUser(req.params.id, req.body);
        console.log("User updated successfully")
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})
app.delete('/users/:id', async (req, res) => {
    try {
        await database.deleteUser(req.params.id);
        console.log(`User with the id ${req.params.id} deleted!`)
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})