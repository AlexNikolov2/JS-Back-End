
const postService = require('../services/post');

const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

router.get('/catalog', async (req, res) => {
    const posts = await postService.getAll();
    res.render('all-posts', { title: 'Catalog', posts });
});


module.exports = router;