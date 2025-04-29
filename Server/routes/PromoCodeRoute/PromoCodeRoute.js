const express = require("express");
const { createToken, getAllTokens, getTokenById, updateToken, deleteToken } = require('../../controller/PromoCodeControllerForAdmin/PromoCodeController');

const router = express.Router();

// POST /tokens - Create a new token
router.post('/create', createToken);

// GET /tokens - Get all tokens
router.get('/getAll', getAllTokens);

// GET /tokens/:id - Get a token by ID
router.get('/single/:id', getTokenById);

// PUT /tokens/:id - Update a token by ID
router.put('/update/:id', updateToken);

// DELETE /tokens/:id - Delete a token by ID
router.delete('/delete/:id', deleteToken);

module.exports = router
