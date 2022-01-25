const fs = require('fs/promises');
const filePath = './services/db.json';

async function read(){
    try{
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    }
    catch(err){
        console.log('Database read error: ');
        console.log(err);
        process.exit(1);
    }
}

async function write(){
    try{
        const file = await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    }
    catch(err){
        console.log('Database read error: ');
        console.log(err);
        process.exit(1);
    }
}

async function getAll(){
    const data = await read();
    let cubes = Object.entries(data).map(([id, v]) => Object.assign({}, {id}, v));

    if(query.search){
        cubes = cubes.filter(c => c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()));
    }
    if(query.from){
        cubes = cubes.filter(c => c.difficulty >= Number(query.from));
    }
    if(query.to){
        cubes = cubes.filter(c => c.difficulty <= Number(query.to));
    }

    return cubes;
}

async function getById(){
    const data = await read();
    const cube = data[id];

    if(cube){
        return Object.assign({}, {id}, cube);
    }
    else {
        return undefined;
    }

}

async function createCube(cubes){
    const data = await read();
    let id = data[id];

    do {
        id = nextId();
    } while (data.hasOwnProperty(id));

    cubes[id] = car;

    await write(cars);
}

function nextId() {
    return 'xxxxxxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCube,
    };
    next();
};