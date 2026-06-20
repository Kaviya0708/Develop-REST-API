const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let products = [
    {
        id: 1,
        name: "Smart Watch",
        price: 2999
    },
    {
        id: 2,
        name: "Headphones",
        price: 1999
    }
];

// GET ALL PRODUCTS
app.get("/api/products", (req, res) => {
    res.json(products);
});

// GET SINGLE PRODUCT
app.get("/api/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const product = products.find(
        p => p.id === id
    );

    if(!product){
        return res.status(404).json({
            message: "Product Not Found"
        });
    }

    res.json(product);
});

// CREATE PRODUCT
app.post("/api/products", (req, res) => {

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

// UPDATE PRODUCT
app.put("/api/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const product = products.find(
        p => p.id === id
    );

    if(!product){
        return res.status(404).json({
            message: "Product Not Found"
        });
    }

    product.name = req.body.name;
    product.price = req.body.price;

    res.json(product);
});

// DELETE PRODUCT
app.delete("/api/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    products = products.filter(
        p => p.id !== id
    );

    res.json({
        message: "Product Deleted"
    });
});

app.listen(5000, () => {
    console.log(
        "Server Running on http://localhost:5000"
    );
});