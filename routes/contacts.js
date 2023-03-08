const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
// Gets all the contacts
router.get('/', contactsController.getAllData);
// Gets a specific contact
router.get('/:id', contactsController.getSingleData);
// Creates a new contact
router.post('/', contactsController.createContact);
// Creates multiple new Contacts
//router.post('/', contactsController.createMultipleContacts);
// Updates the contact by the ID
router.put('/:id', contactsController.updateContactById);
// Deletes the contact by the ID
router.delete('/:id', contactsController.deleteContactById);

module.exports = router;