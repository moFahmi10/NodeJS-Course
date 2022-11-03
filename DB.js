const { read, write } = require("./Storage")


async function getUsers(){
let users = await read("data.json");
return(JSON.parse(users));
}

async function saveUsers(users){
await write("data.json",JSON.stringify(users));
}


async function createNewUser(user){
    let users = await getUsers();
    ids = users.map(u=> u.id);
    user.id = ids.length>0 ?  Math.max(...ids) + 1  : 1001 ;
    users.push(user);
    await saveUsers(users);
}

async function deleteUser(id){
    let users = await getUsers();
    let idx = users.findIndex(user=> user.id == id);
    if (idx == -1){
        throw new Error("User not found");
    }
    else {
    users.splice(idx,1);
    await saveUsers(users);
    }
  

}
module.exports = {
    getUsers,
    saveUsers,
    createNewUser,
    deleteUser
}