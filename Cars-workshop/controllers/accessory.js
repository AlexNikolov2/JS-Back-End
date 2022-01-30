module.exports = {
    get(req, res){
        res.render('createAccesory', {title: 'Create Accesory'});
    },
    async post(req, res) {
        const accesory = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl || undefined,
            price: req.body.price,
        };

        try {
            await req.accesory.createAccesory(accesory);
            res.redirect('/');
        }
        catch (err) {
            console.log("Error creating accesory" + err.message);
            res.redirect('/accesory');
        }
    }

}