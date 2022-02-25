const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const { createPost, getOnePost, editPost, deletePost, vote } = require('../services/post');
const { mapErrors } = require('../middlewares/mapErrors');

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title : 'Create Post'});
});

router.post('/create', isUser(), async (req, res) => {
    const data = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        author: req.session.user._id,
    };

    try {
        await createPost(data);
        res.redirect('/catalog');
    } catch (error) {
        const errors = mapErrors(error);
        res.render('create', { title: 'Create Page', data, errors });
    }


});

router.get('/edit/:id', isUser(), async (req, res) => {
    const postId = req.params.id;
    const data = await getOnePost(postId);

    if (data.author.id != req.session.user._id) {
        return res.redirect('/login');
    }

    res.render('edit', { title: 'Edit Page', data });
});

router.post('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const existingPost = await getOnePost(id);

    if (existingPost.author.id != req.session.user._id) {
        return res.redirect('/login');
    }

    const data = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
    };

    try {
        await editPost(id, data);
        res.redirect(`/details/${id}`);
    } catch (error) {
        const errors = mapErrors(error);
        data.id = id;
        res.render('edit', { title: 'Edit Page', data, errors });
    }
});

router.get('/delete/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const post = await getOnePost(id);

    if (post.author.id != req.session.user._id) {
        return res.redirect('/login');
    }

    try {
        await deletePost(id);
        res.redirect('/catalog');
    } catch (error) {
        const errors = mapErrors(error);
        res.render('details', { title: 'Details Page', post, errors });
    }
});

router.get('/vote/:id/:type', isUser(), async (req, res) => {
    const id = req.params.id;
    const post = await getOnePost(id);
    const type = req.params.type == 'upvote' ? 1 : -1;

    try {
        await vote(id, req.session.user._id, type);
        res.redirect(`/details/${id}`);
    } catch (error) {
        const errors = mapErrors(error);
        console.log(errors);
        res.render('details', { title: 'Details Page', post, errors });
    }
});

module.exports = router;