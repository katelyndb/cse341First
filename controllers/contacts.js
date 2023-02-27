const mongodb = require('../db/connect');
// Used instructor code for ObjectId
const ObjectId = require('mongodb').ObjectId;

const getAllData = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleData = async (req, res, next) => {
  // gets parameter
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });

}

const createContact = async (req, res, next, newContact) => {
  const result = await mongodb.getDb().db().collection('contacts').insertOne(newContact);
  console.log(`New Contact created with the following Id: ${result.insertedId}`);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
}

const createMultipleContacts = async (req, res, next, newContacts) => {
  const result = await mongodb.getDb().db().collection('contacts').insertMany(newContacts);
  console.log(` ${result.insertedCount} new contacts were created with the following ids: `);
  console.log(result.insertedIds)
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
}

const updateContactById = async(req, res, next ) => {
  const userId = new ObjectId(req.params.id);
  const updatedContact = new ObjectId(req.params.updatedContact)
  const result = await mongodb.getDb().db().collection('contacts').updateOne({ _id: userId },{ $set: updatedContact });
  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(`${result.modifiedCount} was/were updated`);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
}


const deleteContactById = async(req, res, next ) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(`${result.modifiedCount} was/were deleted`);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
}

module.exports = { getAllData, getSingleData, createContact, createMultipleContacts, updateContactById, deleteContactById };