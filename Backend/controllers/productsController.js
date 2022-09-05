const asyncHandler =require( "express-async-handler");
const Products=require("../models/products");


//@desc fetch all products

const getProducts=asyncHandler(async function(req,res){
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

    console.log(keyword,"keyword")

  const count = await Products.countDocuments({ ...keyword })
  const products = await Products.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ data:products, page, pages: Math.ceil(count / pageSize) })
});


//@desc fetch a product by id
const getProductById=asyncHandler(async function(req,res){
    try{
        const product =await Products.findById(req.params.id);
        if(product)
        {
            res.json(product);
        }
        else{
            res.status(404);
            throw new Error("not found");
        }
    }
    catch(error)
    {
        console.log(error.message);
        res.status(404);
        throw new Error("not found");
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)
  
    if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
  
  // @desc    Create a product
  // @route   POST /api/products
  // @access  Private/Admin
  const createProduct = asyncHandler(async (req, res) => {
    const product = new Products({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  })
  
  // @desc    Update a product
  // @route   PUT /api/products/:id
  // @access  Private/Admin
  const updateProduct = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body
  
    const product = await Products.findById(req.params.id)
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
  
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
        console.log("error")
      res.status(404)
      throw new Error('Product not found')
    }
  })

  const createProductReview=asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const product = await Products.findById(req.params.id)
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      await product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

module.exports= {getProducts ,getProductById,createProduct,deleteProduct,updateProduct, createProductReview};