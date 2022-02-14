const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    res.render('404', { title: 'Not Found' });
});

module.exports = router;