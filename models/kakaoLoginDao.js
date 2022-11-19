const myDataSource = require('../middlewares/typeorm');

const signUp = async (nickname, email, kakaoId) => {
  const result = await myDataSource.query(
    `
    INSERT INTO users

    (
      name,
      email,
      kakao_id
    )
    
    VALUES (?,?,?)
    
    `,

    [nickname, email, kakaoId]
  );

  return result.getLastInsertedId();
};

module.exports = {
  signUp,
};
