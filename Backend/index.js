const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require("morgan")
const dbConnection = require('./config/dbConnection')
const authRouter = require('./routes/authRoute')
const productRouter = require('./routes/productRoute')
const blogRouter = require('./routes/blogRoute')
const productCategoryRouter = require('./routes/productCategoryRouer')
const blogCategoryRouter = require('./routes/blogCategoryRoute')
const brandRouter = require('./routes/brandRouter')
const couponRouter = require('./routes/couponRoute')
const colorRouter = require('./routes/colorRoute')
const enquiryRouter = require('./routes/enquiryRoute')
const { notFount, errorHandler } = require('./middlewares/errorHandler')
const uploadRouter = require('./routes/uploadRoute')






require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 4500

app.use(morgan('tiny'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(cors())
app.use('/api/user', authRouter)
app.use('/api/product', productRouter)
app.use('/api/blog', blogRouter)
app.use('/api/productcategory', productCategoryRouter)
app.use('/api/blogcategory', blogCategoryRouter)
app.use('/api/brand', brandRouter)
app.use('/api/coupon', couponRouter)
app.use('/api/color', colorRouter)
app.use('/api/enquiry', enquiryRouter)
app.use('/api/upload', uploadRouter)

app.use(notFount)
app.use(errorHandler)
const startServer = async () => {
    await dbConnection()
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}

startServer()

   

