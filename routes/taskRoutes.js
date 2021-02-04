const express = require('express')
const router = express.Router();

const jwtUtils = require("../utils/jwt");
const authMiddleware = require('../utils/jwt')
const userController = require('../controllers/userController')
const categoryController = require('../controllers/categoryController');
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const NotFoundError = require("../utils/errors/not_found_404_error");
const taskController = require('../controllers/taskController');

router.get("/testtask", (req, res) => {
    //   console.log("req de user", req);
    res.send("Task Info");
    
});

router.post('/addtask/:listId', authMiddleware.authenticateJWT, async(req, res) => {
    const { taskName } = req.body;

    const newTask = await taskController.addTask(req.body, req.params.listId);
    console.log("🚀 ~ file: taskRoutes.js ~ line 22 ~ router.post ~ newTask", newTask)

    res.status(200).json({
        id: newTask.id,
        listId: newTask.listId,
        taskName: newTask.taskName,
    })
})

router.get('/gettasks', authMiddleware.authenticateJWT, async(req , res) => {
    const tasksFound = await taskController.getAllTasks(req.params.userId);
    console.log("🚀 ~ file: taskRoutes.js ~ line 33 ~ router.get ~ ******tasksFound", tasksFound)

    if(tasksFound) {
        res.status(200).json({
            tasksFound,
        })
    }
})

router.get('/gettask/:taskId',authMiddleware.authenticateJWT, async(req, res) => {
    const taskFound = await taskController.getTaskById(req.params.taskId);

    if (taskFound) {
        res.status(200).json({
            taskFound,
        })
    }
})

router.patch('/edittask/:taskId', authMiddleware.authenticateJWT, async(req, res) => {
    const data = req.body;
    const taskUpdate = await taskController.updateTaskById(req.params.taskId, data);

    res.status(200).json({
        Task: taskUpdate
    });
})

router.delete('/deletetask/:taskId', authMiddleware.authenticateJWT, async(req, res) => {
    const taskFound = await taskController.deleteTaskById(req.params.taskId);

    if (taskFound) {
        res.status(200).json({
            message: 'Cette task a bien été supprimé.'
        })
    }
})
module.exports = router;
