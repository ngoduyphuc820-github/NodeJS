const dbConnect = require('./db.config');
const query = require('./user.query');

// create user
async function createUser(newUser) {
  const clientResult = await dbConnect.connectClient();
  await clientResult.query(query.createUserQuery, [
    newUser.id,
    newUser.firstname,
    newUser.lastname,
    newUser.age,
    newUser.address,
  ]);
  await clientResult.end();
}

//get all Users
async function getAllUsers() {
  const clientResult = await dbConnect.connectClient();
  const result = await clientResult.query(query.getAllUserQuery);
  await clientResult.end();
  return result.rows;
}

//get User
async function getUser(id) {
  const clientResult = await dbConnect.connectClient();
  const result = await clientResult.query(query.getUserQuery, [id]);
  await clientResult.end();
  return result.rows[0];
}
// delete user
async function deleteUser(id) {
  const clientResult = await dbConnect.connectClient();
  await clientResult.query(query.deleteUserQuery, [id]);
  await clientResult.end();
}

// update user
async function updateUser(updateUser) {
  const clientResult = await dbConnect.connectClient();
  await clientResult.query(query.updateUserQuery, [
    updateUser.firstname,
    updateUser.lastname,
    updateUser.age,
    updateUser.address,
    updateUser.id,
  ]);
  await clientResult.end();
}
// const user = {
//   id: 1002,
//   firstname: 'Ngo Duy 2',
//   lastname: 'Phuc 2',
//   age: 25,
//   address: 'TPHCM 2',
// };
// (async () => {
//   const result = await createUser(user);
//   console.log(result);
// })();

// (async () => {
//   const result = await getAllUsers();
//   console.log(result);
// })();

// (async () => {
//   const result = await getUser(2);
//   console.log(result);
// })();

// (async () => {
//   const result = await deleteUser(1);
//   console.log(result);
// })();

// const user = {
//   id: 1,
//   firstname: 'Ngo Duy',
//   lastname: 'Phuc',
//   age: 25,
//   address: 'TPHCM',
// };

// (async () => {
//   const result = await updateUser(user);
//   console.log(result);
// })();

module.exports = { createUser, getAllUsers, getUser, deleteUser, updateUser };
