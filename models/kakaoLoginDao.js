const myDataSource = require('../middlewares/typeorm');

const getUserById = async kakaoId => {
  return await myDataSource.query(
    `
    SELECT
        email,
        name,
        kakao_id
    FROM sns_info
    WHERE kakao_id = ?
    
    `,
    [kakaoId]
  );
};

const signUp = async (email, name, kakaoId) => {
  return await myDataSource.query(
    `
    INSERT INTO sns_info (
        email,
        name,
        kakao_id
    )
    VALUES (?, ?, ?)
    
    `,
    [email, name, kakaoId]
  );
};

module.exports = {
  getUserById,
  signUp,
};
