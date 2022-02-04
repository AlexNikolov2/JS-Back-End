module.exports = {
    get(req, res){
        res.render('createAccessory', {title: 'Create Accessory'});
    },
    async post(req, res) {
        const accessory = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl || undefined,
            price: req.body.price,
        };

        try {
            await req.accessory.createAccessory(accessory);
            res.redirect('/');
        }
        catch (err) {
            console.log("Error creating accessory" + err.message);
            res.redirect('/accesory');
        }
    }

};