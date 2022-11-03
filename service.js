const { getUsers } = require("./DB");


async function findUserById(id){
    let users = await getUsers();
    let user = users.find(u=> u.id == id);
    if (user) return user;
    else throw new Error("User not found");
}


module.exports = {
    findUserById
}