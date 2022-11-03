const e = require("express");
const { json } = require("express");
const express = require("express");
const { getUsers, saveUsers, createNewUser, deleteUser } = require("./DB");
const { findUserById } = require("./service");

const {read, write} = require("./Storage");
const app = express();

app.use(express.json());

//root route
app.get("/users", async function (req, res) {
    res.json({users: await getUsers()});
});

app.post("/users", async function (req, res){
    let newUser = req.body;
    createNewUser(newUser).then(e=>{
        res.json({musersessage: "User created successfully",newUser});
    })
    
})

app.get("/users/:id",async function (req, res) {
    try{
    let user = await findUserById(req.params.id);
    res.json({user: user});
    }catch(e){
    res.status(400).json({musersessage: e.message});
    }
    
});

// app.delete("/users/:id",  async function (req, res) {
//         let text =  await read("data.json")
//         let users = JSON.parse(text);
//         let {id} = req.params;
//         let idx = users.findIndex(user=> user.id == id);
//         users.splice(idx,1);
//         await write("data.json",JSON.stringify(users));
//         res.json({musersessage:"user deleted successfully"});
//   });
  
  app.delete("/users/:id",  async function (req, res) {
    let {id} = req.params;
    try{
        await deleteUser(id);
        return res.json({musersessage: "User deleted successfully"});
    }catch(e){
        return res.status(400).json({musersessage: e.message});
    }
    
});


app.listen(3000);


