module.exports = {
    async get(req, res){
        const id = req.params.id;

        try{
            const  [car, accessories] = await Promise.all([
                req.storage.getById(id),
                req.accesory.getAll()
            ]);

            const existingIDs = car.accessories.map(a => a.id.toString());
            const filtered = accessories.filter(a => !existingIDs.includes(a.id.toString()));

            res.render('attach', {title: 'Attach Accesory', car, accessories: filtered});
        }
        catch (err) {
            res.redirect('404');
        }
    },
    async post (req, res) {
        const id = req.params.id;
        const accesoryId = req.body.accesoryId;

        try {
            await req.storage.attachAccesory(id, accesoryId);
            res.redirect('/');
        }
        catch (err) {
            console.log("Error attaching accesory" + err.message);
            res.redirect('/attach/' + id);
        }
    }
}