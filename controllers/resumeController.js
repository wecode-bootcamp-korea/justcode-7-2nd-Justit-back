const resumeService = require('../services/resumeService');

//이력서 정보 입력
const putResume = async (req, res) => {
  try {
    const {
      users_name,
      email,
      career, //career: 신입, 1년차,..
      birth,
      phone_number,
      resume_image,
      introduce,
      resume_position_id,
      resume_tech_stack_id,
      resume_education_id,
      resume_career_id,
    } = req.body;

    const userId = req.userInfo.id;

    const REQUIRED_KEYS = {
      users_name,
      email,
      career,
      birth,
      phone_number,
      userId,
    };

    Object.keys(REQUIRED_KEYS).map(key => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400;
        throw error;
      }
    });

    await resumeService.postResume(
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

    res.status(201).json({ message: 'SAVED_RESUME' });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { putResume };
