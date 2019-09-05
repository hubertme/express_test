const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const isProduction = false;

var app = express();
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/screens');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var userData = [];

app.get('/', function(req, res) {
    // res.status(200).send('Hello world');
    res.render('index.html');
});

// Fetch all users
app.get('/user', (req,res) => {
    let responseJson = userData.map( (user) => {
        return {
            id: user.id,
            name: user.name,
            age: user.age,
            salary: user.salary,
            isMarried: user.isMarried
        }
    });

    res.status(200).send(responseJson);
});

// Fetch user with id
app.get(`/user/:id`, (req,res) => {
    let userId = parseInt(req.params.id);
    let userRequested = userData.filter( (user) => user.id === userId);

    if (userRequested.length === 0) {
        res.status(404).send({message: 'User with id '+userId+' not found'});
    } else {
        res.status(200).send({
            message: 'Success retrieved user!',
            user: userRequested[0]
        })
    }

});

// Create new user
app.post('/user', (req, res) => {
    let body = req.body;
    let user = {
        id: userData.length + 1,
        name: body.name,
        age: body.age,
        salary: body.salary,
        isMarried: body.isMarried
    };
    userData.push(user);

    res.status(200).send({
        message: 'Success adding user',
        user: user
    })
});

// Modify user
app.put('/user/:id', (req, res) => {
    let userId = parseInt(req.params.id);
    // let userRequested = userData[userId-1];
    // userData = userData.filter((user) => user.id !== userId)

    let body = req.body;
    let acceptedKey = ['name', 'age', 'salary', 'isMarried'];
    let keys = Object.keys(body);
    let isValid = true;
    keys.forEach((key) => {
        if (!acceptedKey.includes(key)) {
            isValid = false;
        }
    });

    if (!isValid) {
        res.status(500).send({message: 'Illegal element to be changed!'})
    } else if (userId === 0 || userId > userData.length) {
        res.status(404).send({message: 'No user to be changed'})
    } else {
        console.log('Body', body);
        keys.forEach( (key) => {
            userData[userId-1][key] = body[key];
        });

        res.status(200).send({message: 'Successfully updated user!', user: userData[userId-1]});
    }
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:', PORT);
});