const express = require('express')

const router = require('./routes/task.router');
const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('server/public'));

app.use('/tasks', router);
const port = 5000;
app.listen(port, () => {
    console.log('I/m listening');
});