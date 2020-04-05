'use strict';

// Load environment variables from a .env file into process.env
require('dotenv').config()

const records = [
  { id: 1, username: process.env.ADMIN_USERNAME, displayName: process.env.ADMIN_USERNAME, email: process.env.ADMIN_EMAIL }
  ,//{ id: 2, username: 'jane', displayName: 'Jane', email: 'jane@example.com' }
];

const findByEmail = email =>
  new Promise(resolve => {
    setTimeout(
      () => resolve(records.find(user => user.email === email) || false),
      50
    );
  });

const findById = id =>
  new Promise(resolve => {
    setTimeout(() => resolve(records[id - 1] || false), 50);
  });

module.exports = {
  users: {
    findByEmail,
    findById
  }
};
