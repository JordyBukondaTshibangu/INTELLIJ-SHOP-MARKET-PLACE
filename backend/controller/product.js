import Product from '../models/product.js'

export const getProducts = async (req,res) => {
    try {
        
        const products = await Product.find();
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message : "Oupsss......An Error occured ",
            error : error.message
        });
    }
}

export const getProductById =  async (req,res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId);
        
        if(product)  res.status(200).json(product);
        else res.status(404).json({ message : "No Product found "}); 
        
    } catch (error) {
        res.status(500).json({
            message : "Oupsss......An Error occured ",
            error : error.message
        });
    }
}