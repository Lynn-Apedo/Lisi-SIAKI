const express = require("express");
const router = express.Router();

const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use(userRoutes);
router.use(categoryRoutes);

router.get('/', (req, res) => {
    res.status(200).json({ message: "Let's start again toward a better future"})
});

router.get('*', (req, res) => {
    console.log("Erreur 404")
})

module.exports = router;