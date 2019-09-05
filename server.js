const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const isProduction = false;

var app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

var userData = [];

app.get('/', function(req, res) {
    res.status(200).send('Hello world');
});

// Fetch all users
app.get('/users', (req,res) => {
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

app.listen(PORT, function() {
    console.log('Server is running on PORT:', PORT);
});