const { db, Page, User } = require('./models');
const app = require('./app')

const PORT = 1337;

// const auth = async () => {
//   await db.authenticate();
//   console.log('connected to the database');
// };
// auth();

const init = async () => {
  await Page.sync();
  await User.sync();
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init()
