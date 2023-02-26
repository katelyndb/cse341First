const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
// Gets all the contacts
router.get('/', contactsController.getAllData);
// Gets a specific contact
router.get('/:id', contactsController.getSingleData);

module.exports = router;