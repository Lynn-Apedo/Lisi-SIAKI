const bcrypt = require('bcrypt');
const models = require('../models');
const { User, Category, List } = models;

module.exports = {
    addCategory: async (data, userId) => {
        const { categoryName } = data;
        return await Category.create({
            categoryName,
        })
    },

}