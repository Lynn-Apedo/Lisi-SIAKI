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
      getUserByEmail: (email) => {
        return User.findOne({
          where: {
            email,
          },
        });
      },
      checkPassword: (password, userPassword) => {
        return bcrypt.compare(password, userPassword);
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
                "subcategoryName",
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
      // updateUserById: async (id, data) => {
      //   const userUpdate = await User.update(data, { where: { id } });
      //   if (userUpdate) {
      //     return await User.findOne({
      //       where: { id },
      //     });
      //   }
      // },
      updateUserById: async (id, data) => {
  
        // var password = data.password
        // console.log(" password", password)
        // const bcryptHash = await bcrypt.hash(password, 10);
      
          // BCRYPT NEED TO BE FIX OVER HERE !!!!! 
          let test = await bcrypt.hash(data.password, 10);
          // console.log("TCL: test", test)
      
          let test2 = {password:test}
          // console.log("TCL: test2", test2)
      const mixed = Object.assign(data, test2)
      // console.log("TCL: mixed", mixed)
      
      
          console.log('=====> 1')
          const userUpdate = await User.update( data, { where: { id } });
          console.log("TCL: data UPDATE", data)
          console.log("TCL: userUpdate CONTROLLER", userUpdate)
          if (userUpdate) {
          console.log('=====> 2')
            return  User.findOne({
              where: { id },
            });
          }
        },
        deleteUserById: (id) => {
          return User.destroy({
            where: {
              id,
            },
          });
        },
}