const express = require('express')
const router = express.Router();

const authMiddleware = require('../utils/jwt')
const userController = require('../controllers/userController')

router.get("/test", (req, res) => {
    //   console.log("req de user", req);
    res.send("User Info");
    
  });

router.get('/users', async (req, res) => {
    const usersFound = await userController.getUsers(req.body);
    console.log('I am in the get UserByID !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

    if (usersFound) {
        res.status(200).json({
            usersFound,
        });
    }
});
router.get('/user/:userId', async (req, res) => {
  const userFound = await userController.getUserById(req.body);
  console.log('I am in the get UserByID !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
console.log(userId, 'userId ???????')
  if (userFound) {
    res.status(200).json({
        userFound,
    });
}
})



router.post('/signup', async (req, res) => {
    const {
        firstName, lastName, email
    } = req.body;

    if (firstName === null || firstName === undefined || firstName === "") {
        // throw new BadRequestError(
        //   "Mauvaise requête - erreur client",
        //   "Le champ prénom n'est pas renseigné"
        // );
        console.log('Le champ prénom n\'est pas renseigné')
      }
    
      if (lastName === null || lastName === undefined || lastName === "") {
        // throw new BadRequestError(
        //   "Mauvaise requête - erreur client",
        //   "Le champ nom n'est pas renseigné"
        // );
        console.log('Le champ nom n\'est pas renseigné')
      }
    
      if (email === null || email === undefined || email === "") {
        // throw new BadRequestError(
        //   "Mauvaise requête - erreur client",
        //   "Le champ email n'est pas renseigné"
        // );
        console.log('Le champ email n\'est pas renseigné')
      }
    
    
      if (typeof firstName !== "string" || typeof lastName !== "string") {
        // throw new BadRequestError(
        //   "Mauvaise requête - erreur client",
        //   "Le champ pseudo doit être une chaîne de caractères"
        // );
        console.log('Ce champ  doit être une chaîne de lettres')
      }

    const newUser = await userController.addUser(req.body);
    return res.status(201).json({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
    });
})

module.exports = router;
