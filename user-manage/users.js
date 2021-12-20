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






