const router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).json({message: "all is good in the world"});
});

module.exports = router;
