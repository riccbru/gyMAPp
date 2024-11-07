/** DB access module **/

'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('gym-test.DB', (err) => {
  if (err) throw err;
});

module.exports = db;
