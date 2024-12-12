const express = require('express')
const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', {title: 'my express titile', message: 'hello this is template'});
});

module.exports = router