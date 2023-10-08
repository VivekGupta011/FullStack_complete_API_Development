const mongoose = require('mongoose')

mongoose.connection.once('open', () => {
    console.log('Connection to mongodb is successful')
})

mongoose.connection.on('error', err => {
    console.error(err)
  })

const dbConnection = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URL, {
        autoIndex: false, 
        maxPoolSize: 10, 
        serverSelectionTimeoutMS: 5000, 
        socketTimeoutMS: 45000, 
        family: 4 
       })
    } catch (error) {
        console.log('Database connection Error')
    }
}

module.exports = dbConnection