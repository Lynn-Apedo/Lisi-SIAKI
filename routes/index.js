const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Let's start again toward a better future"})
});

router.get('*', (req, res) => {
    console.log("Erreur 404")
})

module.exports = router;