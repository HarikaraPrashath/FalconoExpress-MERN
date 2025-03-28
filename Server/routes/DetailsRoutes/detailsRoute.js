const express = require('express')
const {addDetails,getOneDetails,fetchUserDetails,handleImageUploadUrl}= require('../../controller/userInformation/userInformationController')
const requireAuth = require('../../middleware/requireAuth.js')


const {upload} = require('../../helper/cloudinarySetup')

const router = express.Router();


router.use(requireAuth)

router.post("/uploadimage",upload.single('my_file'),handleImageUploadUrl)
router.post("/post",addDetails)
// router.get("/getAll",fetchProduct)
// router.get("/getOne/:id",getOneDetails)
// router.put("/updateOne/:id",updateDetailsById)
// router.delete("/delete/:id",deleteProduct)


module.exports = router