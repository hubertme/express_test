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