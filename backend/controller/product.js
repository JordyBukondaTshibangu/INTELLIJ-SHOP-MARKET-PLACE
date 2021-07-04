import Product from '../models/product.js'

export const getProducts = async (req,res) => {
    try {
        const pageSize = 4
        const page = Number(req.params.pageNumber) || 1

        const keyword = req.query.keyword ? {
            name : {
                $regex : req.query.keyword,
                $options : 'i'
            }
        } : {}

        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))

        res.status(200).json({ products, page, pages : Math.ceil(count / pageSize)});

    } catch (error) {
        res.status(500).json({
            message : "Oupsss... An Error occured ",
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
export const createProductReview =  async (req,res) => {
    try {
        const { rating, comments } = req.body

        const product = await Product.findById(req.params.id)

        if(product){
            const productAlreadyReviewd = product.reviews.find(review => review.user.toString() === req.user._id.toString())
            
            if(productAlreadyReviewd){
                res.status(400)
                throw new Error('Product Already Reviewed')
            }

            const review = {
                name : req.user.name ,
                rating : Number(rating),
                comments,
                user : req.user._id
            }

            product.reviews.push(review)

            product.numReviews = product.reviews.length

            product.rating = product.reviews.reduce((acc, item )=> item.rating + acc, 0 ) / product.reviews.length

            await product.save()

            res.status(200).json({ message : 'Review added'})
        } else {
            res.status(404).json({
                message : 'Product not found'
            })
            throw new Error('Product Not Found')
        }
        
    } catch (error) {
        res.status(500).json({
            message : "Oupsss......An Error occured ",
            error : error.message
        });
    }
}
export const getToProducts = async (req,res) => {
    try {
        const products = await Product.find({}).sort({ rating : -1 }).limit(5)

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message : "Oupsss... An Error occured ",
            error : error.message
        });
    }
}