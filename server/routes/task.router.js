const express = require('express');
const pool = require('../modules/pool')
const router = express.Router();

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM tasks`
    pool.query(queryText).then(result => {
        res.send(result.rows)
    })
        .catch(error => {
            console.log('error getting tasks', error);
            res.sendStatus(500);
        })
});

router.post('/', (req, res) => {
    console.log('new task is', req.body);
    let queryText = `INSERT INTO tasks (name, complete)
    VALUES ($1, $2);
    `
    let queryParams = [
        req.body.name, 
        req.body.complete
    ]
    pool.query(queryText, queryParams)
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('post error', error);
        res.sendStatus(500);
    })
    
})

module.exports = router;