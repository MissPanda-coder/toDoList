const express = require("express");
const router = express.Router();
const db = require("../server");



// Fetch all archived tasks with their title and the date of archiving
router.get('/', (req, res) => {
    db.query('SELECT taskTitle, taskContent, archivedAt, idtask FROM task JOIN archivedTask ON idtask = task_idtask', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching archived tasks: ' + err.message });
        } else {
            res.json(results);
        }
    });
});
// Add tasks in archivedTask
router.post('/:id', (req, res) => {
    const task_idtask = req.params.id;
    const query = 'INSERT INTO `archivedTask` (`archivedAt`,`task_idtask`) VALUES ( NOW(), ?)';

    db.query(query, [task_idtask], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error adding the task: ' + err.message });
        } else {
            res.status(201).json({ message: "Task successfully archived", id: results.insertId });
        }
    });
});

module.exports = router;