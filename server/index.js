// https://upmostly.com/tutorials/react-onclick-event-handling-with-examples#call-function-after-clicking-button
// ↑ 一个不错的网页，讲 react 什么情况 handler 里面 function 加括号
const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const Path = require('path');
const PORT = 3001;
const { gError } = require('./helper');
const authController = require('./controller/authController');
const jwt = require('jsonwebtoken');

// app.use(express.static(Path.resolve(__dirname, '../client/public')));

// let info = {
//     username: 'pop',
// };
// let token = jwt.sign(info, process.env.ACCESS_TOKEN);
// console.log('TOKEN ,', token);

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`App listening - Port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send(' try get first');
});

app.post('/test', gError(authController.test));

app.post('/cookie', gError(authController.cookie));

app.post('/authMiddle', gError(authController.authMiddle));

app.post('/refresh', gError(authController.refresh));

app.post('/login', gError(authController.login));

app.post('/register', gError(authController.register));
