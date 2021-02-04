const bcrypt = require('bcrypt');
const models = require('../models');
const { User, Category, List, Task } = models;

module.exports = {
    addTask: async (data, listId) => {
        const { taskName } = data;
        List.findByPk(listId, {
            include: [
                {
                    model: Task,
                    attributes: [
                        'id',
                        'listId',
                        'taskName',
                    ]
                }
            ]
        })
        return await Task.create({
            listId,
            taskName,
            
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                    ]
                }, 
                {
                    model: List,
                    attributes: [
                        'id',
                        'listName',
                    ]
                }
            ]
        })
    }, 
    getAllTasks: async() => {
        return Task.findAll({
            order: [['id', 'DESC']],
            raw: true,
            attributes: [
                'id',
                'listId',
                'taskName',

            ]
        })
    }, 
    getTaskById: (taskId) => {
        return Task.findByPk(taskId, {
            include: [
                {
                    model: List, 
                    attributes: [
                        'id',
                        'categoryId',
                        'listName',
                        'subcategoryName'
                    ]
                }
            ]
        })
    }, 
    updateTaskById: async(id,data) => {
        const taskUpdate = await Task.update(data, { where: { id }});

        if (taskUpdate) {
            return await Task.findOne({
                where: { id },
            })
        }
    },
    deleteTaskById: (id) => {
        return Task.destroy({
            where: {
                id,
            }
        })
    }
}