const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
// database address plus collections to work with
const db = mongojs('mongodb://localhost:27017/task-list', ['tasks']);

// get all tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

// get single task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// save task
router.post('/task', function(req, res, next){
    const task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({"error": "Bad Data"});
    } else {
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

// delete task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// update task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updateTask = {};

    if(task.isDone){
        updateTask.isDone = task.isDone;
    }
    if(task.title){
        updateTask.title = task.title;
    }
    if(!updateTask){
        res.status(400);
        res.json({"error":"Bad Data"});
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updateTask, {}, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;