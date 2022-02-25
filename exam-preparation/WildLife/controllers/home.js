const { isUser } = require('../middlewares/guards');
const { getPosts, getOnePost, getUserPosts } = require('../services/post');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

router.get('/catalog', async (req, res) => {
    const posts = await getPosts();
    res.render('all-posts', { title: 'Catalog Page', posts });
});

router.get('/details/:id', async (req, res) => {
    const postId = req.params.id;
    const post = await getOnePost(postId);

    if (req.session.user) {
        if (post.author.id == req.session.user._id) {
            post.isAuthor = true;
        }

        if (post.votes.find(x => x._id == req.session.user._id)) {
            post.hasVoted = true;
        }
    }

    if (post.votes.length > 0) {
        post.hasVotes = true;
        post.votes = post.votes.map(x => x.email).join(', ');
    }

    res.render('details', { title: 'Details Page', post });
});

router.get('/profile', isUser(), async (req, res) => {
    const posts = await getUserPosts(req.session.user._id);
    res.render('my-posts', { title: 'User\'s Posts', posts });
});

router.get('*', (req, res) => {
  res.render('404', {title: 'Not Found'});
});

module.exports = router;