const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
// Gets all the contacts
router.get('/', contactsController.getAllData);
// Gets a specific contact
router.get('/:id', contactsController.getSingleData);
// Creates a new contact
router.get('/newContact/:contactData', contactsController.createContact);
// Creates multiple new Contacts
router.get('/newContacts/:contactsData', contactsController.createMultipleContacts);
// Updates the contact by the ID
router.get('/updateContact/:id/:updatedContact', contactsController.updateContactById);
// Deletes the contact by the ID
router.get('/deletecontact/:id', contactsController.deleteContactById);

module.exports = router;