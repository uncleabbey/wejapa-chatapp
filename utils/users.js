const users = [];

const joinUser = (id, username) => {
  const user = {id, username}
  
  users.push(user)
  
  return user;
}

const getUser = (id) => {
  return users.find(user => user.id === id)
}

const userLeaves = (id) => {
  const index = users.findIndex(user => user.id === id);

  if(index != -1) {
    return users.splice(index, 1)[0]
  }
}
const getUsers = () => {
  return users
}


module.exports = {
  joinUser,
  getUser,
  userLeaves,
  getUsers
}