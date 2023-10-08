const express = require('express')
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleWare')
const { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getAllEnquiry } = require('../controllers/enquiryController')
const enquiryRouter = express.Router()


enquiryRouter.post('/',createEnquiry)
enquiryRouter.put('/update/:id', authMiddleWare, isAdmin, updateEnquiry)
enquiryRouter.delete('/delete/:id', authMiddleWare, isAdmin, deleteEnquiry)
enquiryRouter.get('/getenquiry/:id', getEnquiry)
enquiryRouter.get('/getallenquiry', getAllEnquiry)
module.exports = enquiryRouter;