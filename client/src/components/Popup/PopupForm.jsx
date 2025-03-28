import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "../../hook/useAuthContext";
import { useUserInformation } from "../../hook/useUserInfor";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import axios from "axios";

const PopupForm = ({ onClose, onSuccessfulPurchase }) => {
  const { dispatch } = useUserInformation();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const inputRef = useRef(null);

  const [formData, setFormData] = useState({
    uploadedImageUrl: "", // Add this for image URL
    username: "",
    mobile: "",
    street: "",
    area: "",
    number: "",
    postalCode: "",
    landMark: "",
    // bank: "",
    // branch: "",
    // cNumber: "",
    // cardType: "",
    // owner: "",
    // expiryDate: "",
  });

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return;
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_FRONT_END_API_URL}/details/uploadimage`, {
        method:"POST",
        body: data, // Use FormData directly, no need for JSON.stringify
      });

      const result = await response.json();
      if (response.ok) {
        
        setFormData({ ...formData, uploadedImageUrl: result.result.url}); // Set uploaded image URL in form data
        console.log("Image uploaded successfully:", result);
      } else {
        console.error("Image upload failed:", result);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  const handleRemoveImage = () => {
    setImageFile(null);
    setFormData({ ...formData, uploadedImageUrl: "" }); // Remove image URL from form data
  };

  const handleCarNumberFunction = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16); // Remove non-digits and limit to 16
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1-"); // Format as xxxx-xxxx-xxxx-xxxx
    setFormData({ ...formData, cNumber: formattedValue });
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const emptyFields = Object.keys(formData).filter((key) => !formData[key]);
    if (emptyFields.length > 0) {
      setError("Please fill in all fields.");
      setEmptyFields(emptyFields);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/post", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
      } else {
        dispatch({ type: "CREATE_ORDER", payload: json });
        setFormData({
          uploadedImageUrl: "",
          username: "",
          mobile: "",
          street: "",
          area: "",
          number: "",
          postalCode: "",
          landMark: "",
          bank: "",
          branch: "",
          cNumber: "",
          cardType: "",
          owner: "",
          expiryDate: "",
        }); // Reset form after successful submission
      }

      setTimeout(() => {
        onSuccessfulPurchase();
        onClose();
      }, 1000); // Simulate network delay
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">Personal Form</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 transition">
            ✖
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Image Upload Section */}
          <div className="border-4 rounded-lg border-dotted border-red-500 w-full p-4">
            {!imageFile ? (
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center justify-center cursor-pointer text-center text-red-700"
              >
                <UploadCloudIcon className="w-10 h-10 text-red-500 mb-2" />
                <span className="font-semibold">Click to upload an image</span>
                <span className="text-sm text-red-500">(Supported formats: JPG, PNG, GIF)</span>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  ref={inputRef}
                  onChange={handleImageFileChange}
                />
              </label>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileIcon className="w-8 h-8 text-red-500 mr-2" />
                  <p className="text-sm font-medium truncate">{imageFile.name}</p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-500 hover:text-red-500"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Personal Info */}
          <h3 className="text-lg font-medium text-gray-700">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Address Info */}
          <h3 className="text-lg font-medium text-gray-700">Address Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="area"
              placeholder="Area"
              value={formData.area}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="number"
              placeholder="House/Apartment No."
              value={formData.number}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="number"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="landMark"
              placeholder="Landmark"
              value={formData.landMark}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

         

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PopupForm;
