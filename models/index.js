const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack'); //instantiate Sequelize (make an instance) with the postgres database



module.exports = {
  db
}
