const express = require('express')
const router = express.Router();

const jwtUtils = require("../utils/jwt");
const authMiddleware = require('../utils/jwt')
const userController = require('../controllers/userController')
const categoryController = require('../controllers/categoryController');
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const NotFoundError = require("../utils/errors/not_found_404_error");

router.get("/test", (req, res) => {
    //   console.log("req de user", req);
    res.send("Category Info");
    
});

router.post('/addcategory', authMiddleware.authenticateJWT, async (req, res) => {
    const { categoryName } = req.body;

    if (categoryName === null || categoryName === undefined || categoryName === ''){
        console.log('pb avec le champ categorie')
        throw new BadRequestError(
            "Mauvaise requête - erreur client",
            "Le champ categorie n'est pas renseigné"
        )
    }

    const newCategory = await categoryController.addCategory(req.body, req.user.userID);

    res.status(201).json({
        id: newCategory.id,
        category: newCategory.categoryName,
    })
})
module.exports = router;
