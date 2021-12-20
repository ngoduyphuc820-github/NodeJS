const express = require('express');
const pg = require('pg');
const controller = require('./user.controller');

const router = express.Router();

//get all user
router.get('/', getAllUsers);

//get user by id
router.get('/:id', getUser);

// create new user
router.post('/', createUser);

// update user
router.put('/:id', updateUser);

//delete user
router.delete('/:id', deleteUser);

async function getAllUsers(req, res) {
  const users = await controller.getAllUsers();
  if (users.length === 0) {
    res.status(400).json({ message: 'Users isEmty!' });
  } else {
    res.status(200).json(users);
  }
}

async function getUser(req, res) {
  const id = req.params.id;
  try {
    const user = await controller.getUser(id);
    if (user == null) {
      res.status(400).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: 'Id isFormat' });
  }
}

async function createUser(req, res) {
  const user = req.body;
  try {
    await controller.createUser(user);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: 'Insert Faild' });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const userUpdate = req.body;
    userUpdate.id = id;
    const user = await controller.getUser(id);
    if (user == null) {
      res.status(400).json({ message: 'User not found' });
    } else {
      await controller.updateUser(userUpdate);
      console.log(id);
      res.status(200).end();
    }
  } catch (error) {
    res.status(400).json({ message: 'Id isFormat' });
  }
}

async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const user = await controller.getUser(id);
    if (user != null) {
      await controller.deleteUser(id);
      res.status(200).end();
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Id isFormat' });
  }
}

module.exports = router;
