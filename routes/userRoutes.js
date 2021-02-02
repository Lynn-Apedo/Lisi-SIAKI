const express = require('express')
const router = express.Router();

const jwtUtils = require("../utils/jwt");
const authMiddleware = require('../utils/jwt')
const userController = require('../controllers/userController')
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const NotFoundError = require("../utils/errors/not_found_404_error");

// router.get("/test", (req, res) => {
//     //   console.log("req de user", req);
//     res.send("User Info");
    
//   });

router.get('/users', async (req, res) => {
    const usersFound = await userController.getUsers(req.body);
    console.log('I am in the get User !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

    if (usersFound) {
        res.status(200).json({
            usersFound,
        });
    }
});
router.get('/user/:userId', async (req, res) => {
  const userFound = await userController.getUserById(req.params.userId);

  if (userFound) {
    res.status(200).json({
        userFound,
    });
}
})

router.post('/signup', async (req, res) => {
    const {
        firstName, lastName, email, password
    } = req.body;
    const regexPassword = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z]).{8,16}$/ ;
    // const regexPasswordSpe = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/ 
    // version de regex avec charactères spéciales

    if (firstName === null || firstName === undefined || firstName === "") {
      console.log('Le champ prénom n\'est pas renseigné')
        throw new BadRequestError(
          "Mauvaise requête - erreur client",
          "Le champ prénom n'est pas renseigné"
        );
        
      }
    
      if (lastName === null || lastName === undefined || lastName === "") {
        console.log('Le champ nom n\'est pas renseigné')
        throw new BadRequestError(
          "Mauvaise requête - erreur client",
          "Le champ nom n'est pas renseigné"
        );
      }
    
      if (email === null || email === undefined || email === "") {
        console.log('Le champ email n\'est pas renseigné')
        throw new BadRequestError(
          "Mauvaise requête - erreur client",
          "Le champ email n'est pas renseigné"
        );
        
      }
    
    
      if (typeof firstName !== "string" || typeof lastName !== "string") {
        console.log('Ce champ  doit être une chaîne de lettres')
        throw new BadRequestError(
          "Mauvaise requête - erreur client",
          "Le champ pseudo doit être une chaîne de caractères"
        );
      }

     if (!regexPassword.test(password)) {
      console.log('Le champ mot de passe doit avoir minimum 8 charactères dont au moins un chiffre, une minuscle et une majuscule.')
      throw new BadRequestError(
        "Mauvaise requête - erreur client",
        "Le champ mot de passe doit avoir minimum 8 charactères dont au moins un chiffre, une minuscle et une majuscule."
      );
     }

    const newUser = await userController.addUser(req.body);
    return res.status(201).json({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
    });
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (email === null || email === undefined || email === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ email n'est pas renseigné"
    );
  }

  if (password === null || password === undefined || password === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ pseudo n'est pas renseigné"
    );
  }

  const userFound = await userController.getUserByEmail(email);

  if (userFound) {
    const isIdentified = await userController.checkPassword(
      password,
      userFound.password
    );
    if (isIdentified) {
      res.status(200).json({
        token: jwtUtils.generateTokenForUser(userFound),
        user: {
          id: userFound.id,
        },
      });
    } else {
      throw new UnauthorizedError(
        "Mauvaise requête - erreur client",
        "Email ou mot de passe incorrect"
      );
    }
  } else {
    throw new UnauthorizedError(
      "Mauvaise requête - erreur client",
      "Votre compte n'existe pas"
    );
  }
} )

router.patch("/edituser/:userId", async (req, res) => {
  const data = req.body;
  const userUpdate = await userController.updateUserById(
    req.params.userId,
    data
  );
  res.status(200).json({ UpdateUser: userUpdate });
});

router.delete("/deleteuser/:userId", async (req, res) => {
  const userFound = await userController.deleteUserById(req.params.userId);
  if (userFound) {
    res.status(200).json({
      message: "Utilisateur supprimé",
    });
  } else {
    throw new NotFoundError(
      "Mauvaise requête - erreur client",
      "Cet utilisateur n'a pas été supprimé"
    );
  }
});
module.exports = router;
