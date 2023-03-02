const mongodb = require('../db/connect');
// Used instructor code for ObjectId
const ObjectId = require('mongodb').ObjectId;

const getAllData = async (req, res) => {
  const result = await mongodb.getDb('cse341first').db('cse341first').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleData = async (req, res) => {
  // gets parameter
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb('cse341first').db('cse341first').collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });

}

const createContact = async (req, res) => {
  const contactData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb('cse341first').db('cse341first').collection('contacts').insertOne(contactData);
  console.log(`New Contact created with the following Id: ${result.insertedId}`);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error occurred while creating the contact.');
  }
}

const createMultipleContacts = async (req, res) => {
  const contactsData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb('cse341first').db('cse341first').collection('contacts').insertMany(contactsData);
  console.log(` ${result.insertedCount} new contacts were created with the following ids: `);
  console.log(result.insertedIds)
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error occurred while creating the contact.');
  }
}

const updateContactById = async(req, res) => {
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb('cse341first').db('cse341first').collection('contacts').updateOne({ _id: userId },{ $set: updatedContact });
  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(`${result.modifiedCount} was/were updated`);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the contact.');
  }
}


const deleteContactById = async(req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb('cse341first').db('cse341first').collection('contacts').deleteOne({ _id: userId }, true);
  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Error occured while trying to delete the contact.');
  }
  
 
}

module.exports = { getAllData, getSingleData, createContact, createMultipleContacts, updateContactById, deleteContactById };