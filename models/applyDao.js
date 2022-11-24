const myDataSource = require('../middlewares/typeorm');

//지원하기 모달창
const getresume = async userId => {
  let [resumeInfo] = await myDataSource.query(
    `SELECT 
        U.users_name, U.email, U.phone_number, R.birth, R.career, 
        E.education_year_month, E.education_id, E.resume_education_name, E.education_department
      FROM users U
      JOIN resume R ON U.id = R.users_id
      JOIN resume_education E ON U.id = E.users_id
      WHERE U.id = '${userId}'`
  );

  return resumeInfo;
};

//지원하기 1번버튼 postAPI

const applyFirst = async (posts_id, userId, apply_status) => {
  let post = await myDataSource.query(
    `INSERT INTO
      apply (posts_id, users_id, apply_status) 
      VALUES (${posts_id}, ${userId}, ${apply_status} )
`
  );
  return post;
};

//마이점핏-작성중 getAPI
const getApplying = async userId => {
  const applying = await myDataSource.query(
    `
      SELECT
        posts.title,
        company.company_name
      
      FROM apply
      JOIN posts ON posts.id = apply.posts_id
      JOIN company ON company.id = posts.company_id
      
      WHERE
        users_id = ${userId}
        AND apply_status = 0
        `
  );
  return applying;
};

//지원하기 2번 버튼 updateAPI

const applySecond = async (userId, apply_status, posts_id) => {
  let post = await myDataSource.query(
    `UPDATE apply
    SET apply.apply_status = ${apply_status}
    WHERE apply.users_id = ${userId}
    AND apply.posts_id = ${posts_id}
`
  );
  return post;
};

//마이점핏-지원완료 getAPI
const getApplyed = async userId => {
  const applying = await myDataSource.query(
    `
      SELECT
        posts.title,
        company.company_name
      
      FROM apply
      JOIN posts ON posts.id = apply.posts_id
      JOIN company ON company.id = posts.company_id
      
      WHERE
        users_id = ${userId}
        AND apply_status = 1
      `
  );
  return applying;
};

module.exports = {
  getresume,
  getApplyed,
  getApplying,
  applyFirst,
  applySecond,
};
