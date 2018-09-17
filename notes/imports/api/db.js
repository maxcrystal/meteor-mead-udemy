import yup from 'yup';

import Collection from './collection';


// Describe collections
const notes = {
  _id: yup.string(),
  title: yup.string(),
  body: yup.string(),
  userId: yup.string(),
  updatedAt: yup.date().default(() => new Date()),
};

// Instantiate Mongo Collections
const db = {
  notes: new Collection('notes', notes),
};

export default db;
