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


router.delete('/:id', (req, res) => {
    console.log('id is', req.params.id);
    
    let queryText = `
    DELETE FROM tasks
    WHERE id=$1;
    `
    let queryParams = [
        req.params.id
    ]

    pool.query(queryText, queryParams)
    .then((dbRes) => {
        res.sendStatus(204)
    }).catch((err) => {
        console.log('delete failed', err);
        
    })
})
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

router.put('/:taskId', (req, res) => {
console.log('taskId is', req.params.taskId);
console.log('req.body is ', req.body.complete);

let queryText = `
UPDATE tasks
SET complete = $1
WHERE id = $2;
`;

let queryParams = [
    req.body.complete, 
    req.params.taskId
]
pool.query(queryText, queryParams)
.then((dbRes) => {
    console.log('put success')
    res.sendStatus(204)
}).catch((err) => {
    console.log('put failed', err);
    res.sendStatus(500)
})

})
module.exports = router;