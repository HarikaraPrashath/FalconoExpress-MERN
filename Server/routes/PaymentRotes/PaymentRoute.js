const express = require("express");
const requireAuth = require("../../middleware/requireAuth.js");
const {
  addPayment,
  deletePayment,
  fetchPayment,
  updatePaymentById,
  getOneDetails,
} = require("../../controller/PaymentController/PaymentController.js");

const router = express.Router();

//require auth for all workout routes
router.use(requireAuth);

router.post("/add", addPayment);
router.get("/getAll", fetchPayment);
router.get("/getOne/:id", getOneDetails);
router.put("/updateOne/:id", updatePaymentById);
router.delete("/delete/:id", deletePayment);
module.exports = router;
