const bcrypt = require('bcrypt');
const models = require('../models');
const { User, Category, List } = models;

module.exports = {
    addUser: async (data) => {
        const { id, firstName, lastName, email, password } = data;
        const bcryptHash = await bcrypt.hash(password, 5);
        if (bcryptHash) {
          return User.create({
            id,
            firstName,
            lastName,
            email,
            password: bcryptHash,
          });
        }
      },
      checkEmail: (email) => {
        return User.findOne({
          attributes: ["email"],
          where: {
            email,
          },
        });
      }, 

      

      getUserById: (userId) => {
        return User.findByPk(userId
          , {
          include: [
            {
              model: Category,
              attributes: [
                "id",
                "userId",
                "categoryName",
              ],
            },
            {
                model: List,
                attributes: [
                  "id",
                  "categoryId",
                  "listName",
                ],
              },
          ],
        }
        );
      },

      getUsers: () => {
        return User.findAll({
      
        })
      },
}