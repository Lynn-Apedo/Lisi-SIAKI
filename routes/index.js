const express = require("express");
const router = express.Router();

const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const listRoutes = require('./listRoutes');
const taskRoutes = require('./taskRoutes');

router.use(userRoutes);
router.use(categoryRoutes);
router.use(listRoutes);
router.use(taskRoutes);

router.get('/', (req, res) => {
    res.status(200).json({ message: "Let's start again toward a better future"})
});

router.get('*', (req, res) => {
    console.log("Erreur 404")
})

module.exports = router;