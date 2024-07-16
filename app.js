const express = require('express')
const logger = require('morgan')

const app = express()


app.use(logger("dev"))
app.use(express.json())

let store = [
    {
        name: "apple",
        price: 1.5
    },
    {
        name: "orange",
        price: 1.2
    }
]

app.get('/', (req, res) => {
    res.json(store);
});

app.get('/get-all-products', (req, res) => {
    const productNames = store.map(product => product.name);
    res.json(productNames);
});

app.get('/get-product/:productName', (req, res) => {
    const productName = req.params.productName;
    const product = store.find(item => item.name === productName);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.post('/create-product', (req, res) => {
    const newProduct = req.body;

    const existingProduct = store.find(item => item.name === newProduct.name);
    if (existingProduct) {
        return res.status(400).json({ error: 'Product already exists' });
    }

    store.push(newProduct);
    res.json({ message: 'Product added' });
});

app.delete('/delete-product/:productName', (req, res) => {
    const productName = req.params.productName;
    const initialLength = store.length;

    store = store.filter(item => item.name !== productName);

    if (store.length < initialLength) {
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});



app.listen(3000, () => {
    console.log('Server started!')
})