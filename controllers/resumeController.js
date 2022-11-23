const resumeService = require('../services/resumeService');
const utils = require('../utils/myutils');

//이력서 처음 들어갈때 정보 get (users_name, email)

const getuserinfo = async (req, res) => {
  const userInfo = await resumeService.getuserinfo(req.userInfo.id);

  res.status(200).json({ userInfo }); //userinfo 에 담겨오는 정보를 보여달라
};

//이력서 전체 정보 get
const getresumeinfo = async (req, res) => {
  const resumeInfo = await resumeService.getresumeinfo(req.userInfo.id);

  res.status(200).json({ resumeInfo });
};

// 나머지 정보 등록
const postResume = async (req, res) => {
  const {
    birth,
    career,
    resume_image,
    introduce,
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
    result,
  } = req.body;

  const userId = req.userInfo.id; //body에서 받아와야 하는 값이 아님

  utils.checkDataIsNotEmpty({
    birth,
    career,
    education_year_month,
    education_id,
    resume_education_name,
    education_department,
  });

  await resumeService.postResume(
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

  res.status(200).json({ message: 'SAVED_RESUME' });
};

const updateResume = async (req, res) => {
  const {
    users_name,
    phone_number,
    birth,
    career,
    resume_image,
    introduce,
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
    result,
  } = req.body;

  const userId = req.userInfo.id;

  const postpos = await resumeService.updateResume(
    users_name,
    phone_number,
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

  res.status(200).json({ message: 'UPDATED_RESUME' });
};

module.exports = {
  getuserinfo,
  getresumeinfo,
  postResume,
  updateResume,
};
