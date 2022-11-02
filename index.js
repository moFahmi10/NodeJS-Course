const e = require("express");
const { json } = require("express");
const express = require("express");

const {read, write} = require("./Storage");
const app = express();

app.use(express.json());

//root route
app.get("/users", async function (req, res) {
    let users = await read("data.json")
    res.json(JSON.parse(users));
});

app.post("/users", async function (req, res){
    let newUser = req.body;
    let text = await read("data.json");
    let users = JSON.parse(text);
    let ids = users.map(u => u.id);
    if (ids.length > 0){
        newUser.id = Math.max(...ids) + 1 ;
    }
    else 
    newUser.id = 1001;

    users.push(newUser);

    await write("data.json",JSON.stringify(users));
    res.json({musersessage: "user created successfully"});
})

app.get("/users/:id", function (req, res) {
    read("data.json").then(text => {
        let users = JSON.parse(text)
        let {id} = req.params;
        res.json(users.find((item) => item.id == id));
    })
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
    read("data.json").then(text => {
        let users = JSON.parse(text);
        let {id} = req.params;
        let idx = users.findIndex(user=> user.id == id);
        if (idx == -1){
            res.json({musersessage:"user does not exist"});
        }
        else {
        users.splice(idx,1);
        write("data.json",JSON.stringify(users)).then( e =>{
            res.json({musersessage:"user deleted successfully"});
        }
        );
    }
    })

});


app.listen(3000);


