const express = require('express');
require('./db/config');
const Item = require('./db/Item');
const Price =  require('./db/Price')
const Organization = require('./db/Organization')
const {calculatePrice} = require('./db/service')

const app = express();
app.use(express.json());

app.post("/additem", async (req, res) => {
    try {
        if (!req.body.price || !req.body.description || !req.body.type) {
            return res.status(400).json({ error: 'Missing required fields: price, description, type' });
        }
        let item = new Item({
            price: req.body.price,
            description: req.body.description,
            type: req.body.type
        });
        let result = await item.save();
        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/addprice",async(req,resp)=>{
    try{
        let price = new Price(req.body);
        let result = await price.save();
        resp.status(201).json(result);
    }catch(err){
        console.error(err);
        resp.status(500).json({error:'Internal Server Error'})
    }
});

app.post("/addorg",async(req,resp)=>{
    try{
        let org= new Organization(req.body);
        let result = await org.save();
        resp.status(201).json(result);
    }catch(err){
        console.error(err);
        resp.status(500).json({error:'Internal Server Error'})
    }
});
const organizationId = '6603f3999134f2b3cb3dd8ad';
const itemId = '6603e6e12d2e731f9af8bd36';
const zone = 'Central';
const totalDistance = 10;

calculatePrice(organizationId, itemId, zone, totalDistance)
    .then((price) => {
        console.log('Price:', price);
    })
    .catch((error) => {
        console.error('Error calculating price:', error);
    });



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
