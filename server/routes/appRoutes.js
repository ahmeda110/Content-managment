const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Content Mangment App");
});

module.exports = router;