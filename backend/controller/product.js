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
export const createProduct =  async (req,res) => {
    try {

        const picNumber = Math.floor(Math.random() * 100)
        const product = new Product({
            name : 'sample name',
            price : 0,
            user : req.user._id,
            image : `/images/sample${picNumber}.jpeg`,
            brand : 'sample brand',
            category : 'sample category',
            countInStock : 0,
            description : 'sample description',
            rating : 5,
            numReviews : 0,
        })

        const createdProduct = await product.save()

        res.status(201).json(createdProduct)
        
    } catch (error) {
        res.status(500).json({
            message : "Oupsss......An Error occured ",
            error : error.message
        });
    }
}
export const updateProduct =  async (req,res) => {
    try {
        const {
            name ,
            price ,
            image ,
            brand,
            category ,
            countInStock,
            description,
        } = req.body

        const product = await Product.findById(req.params.id)

        if(product){
            product.name = name || product.name
            product.price = price || product.price
            product.image = image || product.image
            product.brand = brand || product.brand
            product.category = category || product.category
            product.countInStock = countInStock || product.countInStock
            product.description = description || product.description

            const updatedProduct = await product.save()

            res.status(200).json(updatedProduct)

        } else {
            res.status(404).json({ message : 'Product not found'})
        }

        res.status(201).json(createdProduct)
        
    } catch (error) {
        res.status(500).json({
            message : "Oupsss......An Error occured ",
            error : error.message
        });
    }
}
export const deleteProduct =  async (req,res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId);
        
        if(product)  {
            await product.remove()
            res.status(200).json(product)
        }
        else {
            res.status(404).json({ message : "No Product found "})
        }
        
    } catch (error) {
        res.status(500).json({
            message : "Oupsss......An Error occured ",
            error : error.message
        });
    }
}
