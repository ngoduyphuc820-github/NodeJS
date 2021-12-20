const service = require('./user.service');

async function getAllUsers() {
  return await service.getAllUsers();
}
async function createUser(newUser) {
  return await service.createUser(newUser);
}
async function getUser(id) {
  return await service.getUser(id);
}
async function deleteUser(id) {
  return await service.deleteUser(id);
}
async function updateUser(userUpdate) {
  return await service.updateUser(userUpdate);
}

module.exports = { getAllUsers, createUser, getUser, deleteUser, updateUser };
