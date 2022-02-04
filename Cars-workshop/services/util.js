const bcrypt = require('bcrypt');

function accessoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        price: accessory.price,
        owner: accessory.owner
    };
}

function carViewModel(car) {
    const model = {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        accessories: car.accessories,
        owner: car.owner
    };

    if (model.accessories.length > 0 && model.accessories[0].name) {
        model.accessories = model.accessories.map(accessoryViewModel);
    }

    return model;
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(9);//sorry, but my PC is slow is f*ck
    return await bcrypt.hash(password, salt);
}

async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

function isLoggedIn() {
    return (req, res, next) => {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    };
}

module.exports = {
    accessoryViewModel,
    carViewModel,
    hashPassword,
    comparePassword,
    isLoggedIn
};