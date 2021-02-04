const bcrypt = require('bcrypt');
const models = require('../models');
const { User, Category, List } = models;

module.exports = {
    addList: async (data, categoryId) => {
        const {listName, subcategoryName } = data;
        Category.findByPk(categoryId, {
            include: [
                {
                    model: List, 
                    attributes: [
                        'id', 
                        // 'userId',    
                        'categoryId',
                        'listName',
                        'subcategoryName',
                    ],
                },
                {
                    model: User,
                    attributes: [
                        'id',
                    ]
                }
            ]
        })
        
        return await List.create({
            // userId,
            categoryId,
            listName,
            subcategoryName,
            
            include: [
                {
                    model: User,
                    attributes: [
                        'id'
                    ]
                },
                {
                    model: Category,
                    attributes: [
                        'id'
                    ]
                }
            ]
        })
    },
    getAllLists: async () => {
        return List.findAll({
            order: [['id', 'DESC']],
            raw: true,
            attributes: [
                'id', 
                'categoryId',
                'ListName',
                'subcategoryName',
            ]
        })
    },
    getListById: async(listId) => {
        return List.findByPk(listId, {
            include: [
                {
                    model: Category,
                    attributes: [
                        'categoryName'
                    ]
                }
                // {
                //     model: Task, 
                //     attributes: [
                //         'id',
                //         'listId',
                //         'taskName'
                //     ]
                // }
            ]
        })
    },
    updateListById: async(id, data) => {
        const listFound = await List.update(data, { where: { id }});

        if (listFound) {
            return await List.findOne({
                where: { id },
            })
        }
    },

    deleteListById: (id) => {
        return List.destroy({
            where: {
                id,
            }
        })
    },




    getListByCategoryId: async (categoryId) => {
        return List.findByPk(categoryId, {
            include: [
                {
                    model: Category,
                    attributes: [
                        'categoryName'
                    ]
                },
                {
                    model: User, 
                    attributes: [
                        'id',
                    ]
                }
            ], 
            order: [['id', 'DESC']],
            raw: true, 
            attributes: [
                'id', 
                'userId',
                'categoryId',
                'listName',
                'subcategoryName',
            ],
            where: { categoryId: categoryId},
        })
    }
    // getListByCategoryId: async (categoryId) => {
    //     return Category.findByPk(categoryId, {
    //         include: [
    //             {
    //                 model: List,
    //                 attributes: [
    //                     'listName',
    //                     'subcategoryName'
    //                 ]
    //             },
    //             {
    //                 model: User, 
    //                 attributes: [
    //                     'id',
    //                 ]
    //             }
    //         ]
    //     })
    // }








    // addList: async (data,userId, categoryId) => {
    //     const {listName, subcategoryName } = data;
    //     Category.findByPk(categoryId, {
    //         include: [
    //             {
    //                 model: List, 
    //                 attributes: [
    //                     'id', 
    //                     'userId',    
    //                     'categoryId',
    //                     'listName',
    //                     'subcategoryName',
    //                 ],
    //             },
    //             {
    //                 model: User,
    //                 attributes: [
    //                     'id',
    //                 ]
    //             }
    //         ]
    //     })
        
    //     return await List.create({
    //         userId,
    //         categoryId,
    //         listName,
    //         subcategoryName,
            
    //         // include: [
    //         //     {
    //         //         model: User,
    //         //         attributes: [
    //         //             'id'
    //         //         ]
    //         //     }
    //         // ]
    //     })
    // },
}