const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Product = require('./models/product.model.js');
const productRoutes = require('./routes/product.route.js');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello this is the pincipal response')
});

mongoose.connect('mongodb+srv://sm19035:hFMxSrzawumkXpeQ@cluster0.7oovc.mongodb.net/Api-Farmacia?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('DB is connected')
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });

    })
    .catch((err) => {
        console.log('Connection failed')
    });