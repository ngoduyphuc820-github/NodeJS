const express = require('express');
const app = express();
const userRouters = require('./user-manage/user.router');

app.use(express.json());
app.use('/users', userRouters);

const port = 5000;

app.listen(port, () => {
  console.log('Your app running on port ' + port);
});
