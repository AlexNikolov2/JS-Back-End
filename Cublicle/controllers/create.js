module.exports = {
    get(req, res){
        res.render('create', {title: "Create Cube"});
    },
    async post(req, res) {
        const cube = {
        	name = req.body.name,
        	description = req.body.description,
        	imageUrl = req.body.imageUrl,
        	difficulty = Number(req.body.difficulty)
        };

        await req.storage.createCube(cube);
        res.redirect('/');
    }
}