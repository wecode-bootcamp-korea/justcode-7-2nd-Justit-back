const myDataSource = require('../middlewares/typeorm');

const createUser = async (email, name, hashed_password) => {
  await myDataSource.query(
    `
      INSERT INTO
        users
        (email, users_name, password)
      VALUES
        ('${email}', '${name}', '${hashed_password}')
    `
  );
};

// 이메일 중복 여부
const existUser = async email => {
  const [user] = await myDataSource.query(
    `
      SELECT
        id,
        email
      FROM
        users
      WHERE
        email = '${email}'
    `
  );

  return user;
};

// 이메일 존재 여부
const findUserByEmail = async email => {
  const [userInfo] = await myDataSource.query(
    `
      SELECT
        id, email, users_name, password
      FROM
        users
      WHERE
        email = '${email}'
  `
  );

  return userInfo;
};

// getme
const findUserById = async userId => {
  const [userInfo] = await myDataSource.query(`
    SELECT
      id, email, users_name
    FROM
      users
    WHERE
      id = '${userId}'
  `);
  return userInfo;
};

module.exports = {
  createUser,
  findUserByEmail,
  existUser,
  findUserByEmail,
  findUserById,
};