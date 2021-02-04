const express = require('express')
const router = express.Router();

const jwtUtils = require("../utils/jwt");
const authMiddleware = require('../utils/jwt')
const userController = require('../controllers/userController')
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const NotFoundError = require("../utils/errors/not_found_404_error");
const listController = require('../controllers/listController');
const categoryController = require('../controllers/categoryController')

router.get("/testlist", (req, res) => {
    //   console.log("req de user", req);
    res.send("List Info");
    
});

router.post('/addlist/:categoryId', authMiddleware.authenticateJWT, async (req, res) => {
    // const categoryFound = await categoryController.getCategoryById(req.params.categoryId);
    // console.log("🚀 ~ file: listRoutes.js ~ line 20 ~ router.post ~ ****** categoryFound", categoryFound)
    
    const { listName, subcategoryName } = req.body;

    if (listName === null || listName === undefined || listName === '') {
        console.log('Le champ nom de liste n\'est pas renseigné')
        throw new BadRequestError(
            "Mauvaise requête - erreur client",
            "Le champ categorie n'est pas renseigné"
        )
    }

    // const userFound = await userController.getUserById(req.user.userID)
    // console.log("🚀 ~ file: listRoutes.js ~ line 33 ~ router.post ~ userFound", userFound)
    
    // const categoryFound = await categoryController.getAllCategoriesByUserId(req.user.userID);

    const newList = await listController.addList(req.body, req.params.categoryId);
    console.log("🚀 ~ file: listRoutes.js ~ line 29 ~ router.post ~ ^^^^ newList", newList)

    // console.log('***** categoryId de newList', newList.categoryId)
    // console.log('====> categoryId de newList', newList.userId)


    // if (categoryFound) {
    console.log("🚀 ~ file: listRoutes.js ~ line 45 ~ router.post ~ ===> ***req.params.categoryId", req.params.categoryId)
    console.log("🚀 ~ file: listRoutes.js ~ line 45 ~ router.post ~ ====> req.body,", req.body,)
    // console.log("🚀 ~ file: listRoutes.js ~ line 36 ~ router.post ~ req.params.categoryId", req.params.categoryId)
    // console.log("🚀 ~ file: listRoutes.js ~ line 36 ~ router.post ~ req.user.userID", req.user.userID)
        res.status(200).json({
            id: newList.id, 
            // userId: newList.userId,
            categoryId: newList.categoryId,
            listName: newList.listName,
            subcategoryName: newList.subcategoryName,
        })
    // }
    
    // res.status(200).json({
    //     id: newList.id, 
    //     userId: newList.userId,
    //     categoryId: newList.categoryId,
    //     listName: newList.listName,
    //     subcategoryName: newList.subcategoryName,
    // })
})

router.get('/getlists', authMiddleware.authenticateJWT, async(req, res) => {
    const listsFound = await listController.getAllLists(req.params.userId);
    if (listsFound) {
        res.status(200).json({
            listsFound,
        })
    }
});

router.get('/getlist/:listId', authMiddleware.authenticateJWT, async(req, res) => {
    const listFound = await listController.getListById(req.params.listId);

    if (listFound) {
        res.status(200).json({
            listFound,
        })
    }
})

router.patch('/editlist/:listId', authMiddleware.authenticateJWT, async(req, res) => {
    const data = req.body;
    const listUpdate = await listController.updateListById(req.params.listId, data);
    res.status(200).json({
        List: listUpdate
    });
})

router.delete('/deletelist/:listId', authMiddleware.authenticateJWT, async(req, res) => {
    const listFound = await listController.deleteListById(req.params.listId);

    if (listFound) {
        res.status(200).json({
            message: 'Cette liste a bien été supprimé'
        })
    }
})

// router.get('/getlistsbycategory/:categoryId', authMiddleware.authenticateJWT, async(req, res) => {
//     const listByCategoryFound = await categoryController.getCategoryById(req.params.userID)
//     console.log("🚀 ~ file: listRoutes.js ~ line 51 ~ router.get ~ listByCategoryFound", listByCategoryFound)

//     if (listByCategoryFound) {
//         res.status(200).json({
//             listByCategoryFound,
//         })
//     }
// })

module.exports = router;
