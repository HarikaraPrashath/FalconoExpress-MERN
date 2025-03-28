const { imageUploadUnit } = require('../../helper/cloudinarySetup');
const Details = require('../../models/UserDetailInfor/UserDetails.js')



const   handleImageUploadUrl = async (req, res) => {
    try {
        // Convert file buffer to Base64 and create a valid Data URI
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = `data:${req.file.mimetype};base64,${b64}`;
        

        // Pass the Data URI to the Cloudinary upload function
        const result = await imageUploadUnit(url);

        res.json({
            success: true,
            result,
        });
    } catch (e) {
        console.error('Image upload error:', e.message);
        res.status(500).json({
            success: false,
            message: 'Error occurred during image upload',
        });
    }
};


//add new product
const addDetails = async (req, res) => {
    try {
      console.log('Request body:', req.body); // Debug log to inspect incoming data
      const { uploadedImageUrl, username,street, mobile, area, number, postalCode,landMark,bank,branch,cNumber,cardType,owner,expiryDate} = req.body;
  
      if (!Array.isArray(size) || size.some((item) => typeof item !== 'string')) {
        return res.status(400).json({ error: 'Invalid size format' });
      }
  
      const details = new Details({uploadedImageUrl, username,street, mobile, area, number, postalCode,landMark,bank,branch,cNumber,cardType,owner,expiryDate});
      await details.save();
  
      res.status(201).json({ success: true, details });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };


  

  //fetch product
  const fetchUserDetails = async(req,res)=>{
    try{
      const listOfProducts = await Details.find({})
        res.status(200).json
        ({
            success:true,
            data:listOfProducts
        })
    }

    catch(err){
      console.log(err)
      res.status(500).json({
        success:false,
        message:'Error while fetching data'
      })
    }
  }

  //ready product by id
  const getOneDetails = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters
        const oneDetails = await Details.findById(id); // Pass the ID to findById
  
        if (!oneDetails) { // No need to check `length` for a single document
            return res.status(404).json({ message: "No details found" });
        }
  
        res.json({ message: "Detail found", data: oneDetails });
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).json({ message: "Failed to fetch details" });
    }
  };
  
  module.exports = {addDetails,fetchUserDetails,getOneDetails,handleImageUploadUrl};



