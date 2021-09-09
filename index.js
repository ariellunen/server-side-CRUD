

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
    const users = await database.getUsers();
    if(users.length == 0){
        res.status(404).json({"error":"Users not found"}); 
    }
    res.json(users)
})

app.get('/users/:id', async (req, res) => {
    const user = await database.getUserById(req.params.id);
    if(user == undefined){
        res.status(404).json({"error": "User not found"}); 
    }
    res.json(user)
})

app.post('/users', async (req, res) => {
    try{
        if(req.body == undefined || req.body.id == undefined){
            res.status(404).json({"error": "User wasnt added"});
        }
        else{
            await database.createUser(req.body);
            res.status(200).json({"Succsses":"The user added!"});
        }
    }
    catch{
        res.status(404).json({"error": "User wasnt added"});
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const users = await database.getUsers();
        let idExist = false;
        for(let user in users){
            if(users[user].id == req.params.id){
            idExist = true;
            }
        }
        if(idExist){
            if(req.body.name || req.body.email || (req.body.name && req.body.email)){
                await database.updateUser(req.params.id, req.body);
                res.status(200).json({"Succsses":`User with the id ${req.params.id} has been update`});
            }
        }
    res.status(404).json({"error": `User(${req.params.id}) not update`});
    }
    catch{
        res.status(404).json({"error": `User(${req.params.id}) not update`});
    }
})

app.delete('/users/:id', async (req, res) => {
    const users = await database.getUsers();
        for(let user in users){
            if(users[user].id == req.params.id){
                console.log(users[user].id)
               await database.deleteUser(req.params.id);
                res.status(200).json({"Succsses":"The user deleted!"});
            }
        }
    res.status(404).json({"error": "User not found"});
})