const bcrypt = require('bcrypt');
const models = require('../models');
const { User, Category, List } = models;

module.exports = {
    addCategory: async (data, userId) => {
        const { categoryName } = data;
        return await Category.create({
            userId,
            categoryName,
        })
    },
    getAllCategories: () => {
        return Category.findAll({
            order: [['id', 'DESC']],
            raw: true,
            attributes: [
                'id', 
                'userId',
                'categoryName',
            ]
        })
    }, 
    getCategoryById: (categoryId) => {
        return Category.findByPk(categoryId, {
            include: [
                {
                    model: List, 
                    attributes: [
                        'id', 
                        'userId',    
                        'categoryId',
                        'listName',
                        'subcategoryName',
                    ],
                },
            ]
        })
    },
    getAllCategoriesByUserId: (userId) => {
        return Category.findAll({
            // include: [
            //     {
            //         model: User,
            //         attributes: [
            //             'id'
            //         ]
            //     }
            // ], 
            order: [['id', 'DESC']],
            raw: true,
            attributes: [
                'id',
                'userId',
                'categoryName',
            ],
            where: { userId : userId},
        })
    },
    updateCategoryById: async (id, data) => {
        const categoryUpdate = await Category.update(data, { where: { id } });
        if (categoryUpdate) {
            return await Category.findOne({
                where: { id },
        });
        }
    },
    deleteCategoryById: (id) => {
        return Category.destroy({
            where: {
                id,
            }
        })
    }

}