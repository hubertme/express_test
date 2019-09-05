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

app.post('/user', (req, res) => {
    console.log('Body:', req.body);

    res.status(500).send({
        message: 'This endpoint is still under construction'
    })
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:', PORT);
});