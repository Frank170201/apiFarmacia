const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Product = require('./modules/product.model.js');

app.use(express.json());



app.get('/',(req,res)=>{
    res.send('Hello this is the pincipal response')
});

app.get('/api/products',async (req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/product/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const productById = await Product.findById(id)
        res.status(200).json(productById);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api/products',async (req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update a product
app.put('/api/product/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const product=await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            res.status(404).json({message: 'Product not found'})
        }
        const updatedProduct= await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete a product

app.delete('/api/product/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message: 'Product not found'})
        }
        res.status(200).json({message: 'Product deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://sm19035:hFMxSrzawumkXpeQ@cluster0.7oovc.mongodb.net/Api-Farmacia?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=> {
        console.log('DB is connected')
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        
    })
    .catch((err)=>{
        console.log('Connection failed')
    });