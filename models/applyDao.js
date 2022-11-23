const myDataSource = require('../middlewares/typeorm');

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

module.exports = {
  getresume,
};
