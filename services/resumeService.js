const resumeDao = require('../models/resumeDao');
const jwt = require('jsonwebtoken');
// const jwtSecret = process.env.JWT_SECRET;

const postResume = async (
  users_name,
  email,
  career,
  birth,
  phone_number,
  resume_image,
  introduce,
  resume_position_id,
  resume_tech_stack_id,
  resume_education_id,
  resume_career_id,
  userId
) => {
  //   //로그인 만들어지면 작성
  //   const user = jwt.verify(token, jwtSecret);
  //   const users_id = users.id;

  //year 1950-2007 (에러핸들링)
  if (birth > 2007 && birth < 1950) {
    const error = new Error('BIRTH_INVALID');
    error.statusCode = 400;
    throw error;
  }

  //이력서 페이지 로그인 여부에 따라 다르게 보이는 (토큰 필요)

  const updateResume = await resumeDao.updateResume(
    users_name,
    email,
    career,
    birth,
    phone_number,
    resume_image,
    introduce,
    resume_position_id,
    resume_tech_stack_id,
    resume_education_id,
    resume_career_id,
    userId
  );

  return updateResume;
};

module.exports = { postResume };
