const router = require('express').Router();
const housingService = require('../services/house');

router.get('/', async (req, res)=>{
    let housings = await housingService.getAll();
    res.render('housing', {housings});
});

router.get('/create', (req, res)=>{
    res.render('housing/create');
});

router.post('/create', async (req, res)=>{
    await housingService.create({...req.body, owner: req.user._id});
    res.redirect('/housing');
});

router.get("/:housingId/details", async (req, res)=>{
    let housing = await housingService.getOne(req.params.housingId);
    let housingData = await housing.toObject();
    let isOwner = housingData.owner == mongoose.Types.ObjectId(req.user?._id);
    let tenants = await housing.getTenants();
    let isAvailable = housing.availablePieces>0;
    let isRented = housing.tenants.some(x => x._id == req.user._id);
    res.render("housing/details", {...housingData, isOwner, tenants, isAvailable, isRented});
});

async function isOwner(req, res, next){
    let housing = await housingService.getOne(req.params.housingId);
    if(housing.owner == req.user._id){
        res.redirect(`/housing/${req.params.housingId}/details`);
    }else{
        next();
    }
}

router.get("/:housingId/rent", isOwner, async (req, res)=>{
    await housingService.addTenant(req.params.housingId, req.user._id);
    
    res.redirect(`/housing/${req.params.housingId}/details`);
});

router.get('/:housingId/delete', async(req, res)=>{
    await housingService.delete(req.params.housingId);
    res.redirect('/housing');
});

router.get('/:housingId/edit', async (req, res)=>{
    let housing = await housingService.getOne(req.params.housingId);
    res.render('housing/edit', {...housing.toObject()});
});

router.post('/:housingId/edit', async (req, res)=>{
    await housingService.updateOne(req.params.housingId, req.body);
    res.redirect(`/housing/${req.params.housingId}/details`);
});
module.exports = router;