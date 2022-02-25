
function mapErrors(err) {
    if (Array.isArray(err)) {
        return err;
    } else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => ({ msg: e.message }));
    } else if (typeof err.message == 'string') {
        return [{ msg: err.message }];
    } else {
        return [{ msg: 'Request error' }];
    }
}

function posViewModel(data) {
    data = {
        id: data._id,
        title: data.title,
        keyword: data.keyword,
        location: data.location,
        date: data.date,
        image: data.image,
        description: data.description,
        author: userViewModel(data.author),
        votes: data.votes,
        rating: data.rating
    };

    return data;
}

function userViewModel(user) {
    return {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname
    };
}

module.exports = {
    mapErrors,
    posViewModel
};