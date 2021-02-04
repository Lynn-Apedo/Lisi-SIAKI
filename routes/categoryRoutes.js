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
    // console.log("🚀 ~ file: categoryRoutes.js ~ line 19 ~ router.post ~ categoryName", categoryName)

    if (categoryName === null || categoryName === undefined || categoryName === ''){
        console.log('pb avec le champ categorie')
        throw new BadRequestError(
            "Mauvaise requête - erreur client",
            "Le champ categorie n'est pas renseigné"
        )
    }

    const newCategory = await categoryController.addCategory(req.body, req.user.userID);
    console.log("🚀 ~ file: categoryRoutes.js ~ line 30 ~ router.post ~ newCategory", newCategory)

    res.status(201).json({
        id: newCategory.id,
        userId: newCategory.userId,
        category: newCategory.categoryName,
    })
})

router.get('/getcategories', async (req, res) => {
    const categoriesFound = await categoryController.getAllCategories(req.params.userId)
    if (categoriesFound) {
        res.status(200).json({
            categoriesFound,
        })
    }
})

router.get('/category/:categoryId', async (req, res) => {
    const categoryFound = await categoryController.getCategoryById(req.params.categoryId);

    if (categoryFound) {
        res.status(200).json({
            categoryFound,
        })
    }
})

router.get('/categories',authMiddleware.authenticateJWT, async (req, res) => {
    const categoryFound = await categoryController.getAllCategoriesByUserId(req.user.userID);
    console.log("🚀 ~ file: categoryRoutes.js ~ line 58 ~ router.get ~ ***categoryFound", categoryFound)

    if (categoryFound) {
    console.log("🚀 ~ file: categoryRoutes.js ~ line 61 ~ router.get ~ ===> req.user.userID", req.user.userID)
        res.status(200).json({
            categoryFound,
        })
    }
})

router.patch('/editcategory/:categoryId',authMiddleware.authenticateJWT, async (req, res) => {
    const data = req.body;
    const categoryUpdate = await categoryController.updateCategoryById(
        req.params.categoryId,
        data
    );
    res.status(200).json({ Category: categoryUpdate });
})

router.delete('/deletecategory/:categoryId', async (req, res) => {
    const categoryFound = await categoryController.deleteCategoryById(req.params.categoryId)
    
    if (categoryFound) {
        res.status(200).json({
            message: 'Cette catégorie a bien été supprimé.'
        })
    }
})
module.exports = router;
