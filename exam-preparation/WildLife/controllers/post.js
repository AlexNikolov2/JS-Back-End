const {Router} = require('express');
const {body, validationResult} = require('express-validator');

const { isAuth, isCreator} = require('../middlewares/guards');
const postService = require('../services/post');

const router = Router();

router.get('/create', isAuth(), async (req, res) => {
    res.render('create', {title: 'Create post'});
});

router.post('/create', isAuth(),
    /*body('title').trim().isLength({min: 6}).withMessage('Title must be minimum 6 characters!'),
    body('keyword').trim().isLength({min: 6}).withMessage('keyword must be minimum 6 characters!'),
    body('location').trim().isLength({max: 15}).withMessage('Location must be minimum 6 characters!'),
    body('imageUrl').trim().matches(new RegExp('^https?')).withMessage('Image URL is invalid!'),
    body('description').trim().isLength({min: 8}).withMessage('Description must be minimum 8 characters!'),*/
 async (req, res) => {
    const data = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        imageUrl: req.body.image,
        description: req.body.description,
        author: req.user._id
    };
    try {
        const errors = validationResult(req).array().map(x => x.msg);

        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }

        await postService.create(data);
        res.redirect('/catalog');
    } catch (error) {
        data._id = req.params.id;
        res.render('create', {title: 'Create post', errors: error.message.split('\n'), post: data});
    }
});

router.get('/details/:id', async (req, res) => {
    let post = await postService.getById(req.params.id);
    const isAuthor = req.user && post.author._id == req.user._id;
    const isVoted = req.user && postService.isVoted(post, req.user);
    const allVotedUsers = req.user && postService.votedUsers(post);

    post = post.toObject();
    res.render("details", { post, isAuthor, isVoted, allVotedUsers });
});

router.get("/delete/:id", isAuth, async (req, res) => {
    await postService.deleteById(req.params.id);
    res.redirect("/allPosts");
});

router.get("/edit/:id", isAuth, async (req, res) => {
    let post = await postService.getPostById(req.params.id);
    post = post.toObject();
    res.render("edit", { ...post });
});

router.post("/edit/:id", isAuth, async (req, res) => {
    const { title, keyword, location, date, imageUrl, description } = req.body;
    await postService.editPost(req.params.id, { title, keyword, location, date, imageUrl, description });
    res.redirect(`/details/${req.params.id}`);


});

router.get("/up-vote/:id", isAuth, async (req, res) => {
    await postService.upVote(req.params.id, req.user);

    res.redirect(`/details/${req.params.id}`);

});

router.get("/down-vote/:id", isAuth, async (req, res) => {
    await postService.downVote(req.params.id, req.user);

    res.redirect(`/details/${req.params.id}`);
});

router.get("/my-posts", isAuth, async (req, res) => {
    const myPosts = await postService.myPosts(req.user._id);
    console.log(myPosts);
    res.render("my-posts", { myPosts });
});

module.exports = router;