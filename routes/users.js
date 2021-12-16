const express = require('express');
const pg = require('pg');

const router = express.Router();

//connect pg
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'nodejsDemo',
  password: '111111',
  port: 5432,
};

async function connectClient() {
  const client = new pg.Client(config);
  await client.connect();
  return client;
}

//get all user
router.get('/', async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

//get user by id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
    res.json(user);
});

// create new user
router.post('/', async (req, res) => {
  const user = req.body;
  await createUser(user);
  res.status(200).end();
});

// update user
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  const userUpdate = req.body;
  if (user != null) {
    await updateUser(userUpdate);
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

//delete user
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  if (user != null) {
    await deleteUser(id);
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

// create user
async function createUser(newUser) {
  const clientResult = await connectClient();
  const query = `INSERT INTO "Users"("id", "firstname", "lastname", "age", "address") 
                      VALUES ($1, $2, $3, $4, $5)`;
  const result = await clientResult.query(query, [
    newUser.id,
    newUser.firstname,
    newUser.lastname,
    newUser.age,
    newUser.address,
  ]);
  await clientResult.end();
  return `Created user with id: ${newUser.id}`;
}

//get all Users
async function getAllUsers() {
  const clientResult = await connectClient();
  const query = `SELECT * FROM "Users"`;
  const result = await clientResult.query(query);
  await clientResult.end();
  return result.rows;
}

//get User
async function getUser(id) {
  const clientResult = await connectClient();
  const query = `SELECT * FROM "Users" WHERE "id" = $1`;
  const result = await clientResult.query(query, [id]);
  await clientResult.end();
  if (result.rowCount > 0) {
    return result.rows[0];
  } else {
    return null;
  }
}
// delete user
async function deleteUser(id) {
  const clientResult = await connectClient();
  const user = await getUser(id);
  if (user != null) {
    const query = `DELETE FROM "Users" WHERE "id" = $1`;
    const result = await clientResult.query(query, [id]);
    await clientResult.end();
    return true;
  } else {
    return false;
  }
}

// update user
async function updateUser(updateUser) {
  const clientResult = await connectClient();
  const user = await getUser(updateUser.id);
  if (user != null) {
    const query = `UPDATE "Users" SET "firstname" = $1, "lastname" = $2, 
                    "age" = $3, "address" = $4 WHERE "id" = $5`;
    const result = await clientResult.query(query, [
      updateUser.firstname,
      updateUser.lastname,
      updateUser.age,
      updateUser.address,
      updateUser.id,
    ]);
    await clientResult.end();
    return true;
  } else {
    return false;
  }
}

// const user = {
//   id: 2,
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

module.exports = router;
