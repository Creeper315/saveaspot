// https://upmostly.com/tutorials/react-onclick-event-handling-with-examples#call-function-after-clicking-button
// ↑ 一个不错的网页，讲 react 什么情况 handler 里面 function 加括号
const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
// const Path = require('path');
const PORT = 3001;
const { gError, authMiddle } = require('./helper');
const authController = require('./controller/authController');
const postController = require('./controller/postController');
const helperController = require('./controller/helperController');
// app.use(express.static(Path.resolve(__dirname, '../client/public')));

// let info = {
//     username: 'pop',
// };
// let token = jwt.sign(info, process.env.ACCESS_TOKEN);
// console.log('TOKEN ,', token);

// https://master--musical-buttercream-7dbada.netlify.app

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: [
        'https://master--musical-buttercream-7dbada.netlify.app',
        'https://localhost:3000',
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors);

app.listen(process.env.PORT || PORT, () => {
    console.log(`App listening - Port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send(' try get first');
});

app.post('/test', gError(authController.test));

// app.post('/cookie', gError(authController.cookie));

// app.post('/authMiddle', gError(authController.authMiddle));

// app.post('/refresh', gError(authController.refresh));

app.post('/login', gError(authController.login));

app.post('/register', gError(authController.register));

app.post('/getpost', authMiddle, gError(postController.getPageData));

app.get('/getlocation', authMiddle, gError(helperController.loadLocation));

app.get('/getlocation', authMiddle, gError(helperController.loadLocation));

app.post('/likeuser', authMiddle, gError(helperController.likeUser));

app.post('/postupdate', authMiddle, gError(postController.postUpdate));

app.post('/posthelp', authMiddle, gError(postController.postHelp));

app.post('/postsave', authMiddle, gError(postController.postSave));

app.post('/postdelete', authMiddle, gError(postController.postDelete));

app.post('/checksaved', authMiddle, gError(postController.checkSaved));

app.post('/postedit', authMiddle, gError(postController.postEdit));

// app.post('/userupdate', authMiddle, gError())

// app.post('/getPageData', authMiddle, gError(postController));
