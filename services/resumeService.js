const resumeDao = require('../models/resumeDao');
const jwt = require('jsonwebtoken');

// 처음 이력서 들어갔을 때 보이는 인포
const getuserinfo = async () => {
  const userInfo = await resumeDao.getuserinfo(usersId);
  return userInfo;
};

// 이력서 등록
const postResume = async (
  birth,
  career,
  resume_image,
  introduce,
  userId,
  position_id,
  tech_stack_id,
  education_year_month,
  education_id,
  resume_education_name,
  education_department,
  career_year_month,
  resume_career_name,
  career_introduce,
  career_department,
  career_tech_stack_id,
  result
) => {
  //year 1950-2007 (에러핸들링)
  if (birth > 2007 && birth < 1950) {
    const error = new Error('BIRTH_INVALID');
    error.statusCode = 400;
    throw error;
  }

  const postresume = await resumeDao.postResume(
    birth,
    career,
    resume_image,
    introduce,
    userId,
    position_id,
    tech_stack_id,
    education_year_month,
    education_id,
    resume_education_name,
    education_department,
    career_year_month,
    resume_career_name,
    career_introduce,
    career_department,
    career_tech_stack_id,
    result
  );

  return postresume;
};

// 이력서 수정
const updateResume = async (
  users_name,
  career,
  birth,
  resume_image,
  introduce,
  users_id,
  position_id,
  tech_stack_id
  //education_id,
) => {
  const updateresume = await resumeDao.updateResume(
    users_name,
    career,
    birth,
    resume_image,
    introduce,
    users_id,
    position_id,
    tech_stack_id
    //education_id,
  );
};

module.exports = { getuserinfo, postResume, updateResume };
