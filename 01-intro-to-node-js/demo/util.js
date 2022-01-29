function html(body, title = "kur za lefski") {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <title>${title}</title>
        </head>
        <body>
        <nav>
        <a href="/">Home</a>
        <a href="/catalog">Catalog</a>
        <a href="/about">About</a>
        ${body}
        </body>
        </html>
    `;
}

function addItem(name, color){
    const id = nextId();
    data[id] = {
        name, 
        color
    };
}

function getItems(){
    return Object.entries(data).map(([id, v]) => Object.assign({}, { id }, v));
}

function deleteItem(id){
    delete data[id];
}
function nextId() {
    return 'xxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}

const data = {
    '9a419f23': {
        name: 'Product 1',
        color: 'red'
    },
    '7b14d2c1': {
        name: 'Product 2',
        color: 'green'
    }
};

module.exports = {
    html,
    addItem,
    getItems,
    deleteItem
};