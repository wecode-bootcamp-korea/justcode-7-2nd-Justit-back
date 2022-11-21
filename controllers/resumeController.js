const resumeService = require('../services/resumeService');
const utils = require('../utils/myutils');

//이력서 정보 입력

const getuserinfo = async (req, res) => {
  const userInfo = await userService.getuserinfo(req.userInfo.id);
  res.status(200).json({ users_name, email, phone_number });
};

const postuser = async (req, res) => {
  const { birth, career, resume_image, introduce } = req.body;
  utils.checkDataIsNotEmpty({ birth, career });
  const postInfo = await userService.postuser(
    birth,
    career,
    resume_image,
    introduce
  );

  res.status(200).json({ message: 'SAVED_BIRTH_CAREER_RESUMEIMAGE_INTRODUCE' });
};

const postposition = async (req, res) => {
  const { resume_position_id } = req.body;
  const postpos = await userService.postposition(resume_position_id);

  res.status(200).json({ message: 'SAVED_POSTPOSITION' });
};

const posttechstack = async (req, res) => {
  const { resume_tech_stack_id } = req.body;
  const posttech = await userService.posttechstack(resume_tech_stack_id);

  res.status(200).json({ message: 'SAVED_POSTTECHSTACK' });
};

const posteducation = async (req, res) => {
  const { resume_education_id } = req.body;
  const postedu = await userService.posteducation(resume_education_id);

  res.status(200).json({ message: 'SAVED_POSTEDUCATION' });
};

const postcareer = async (req, res) => {
  const { resume_career_id } = req.body;
  const postcar = await userService.postcareer(resume_career_id);

  res.status(200).json({ message: 'SAVED_POSTCAREER' });
};

// const putResume = async (req, res) => {
//   try {
//     const {
//       users_name,
//       email,
//       career, //career: 신입, 1년차,..
//       birth,
//       phone_number,
//       resume_image,
//       introduce,
//       resume_position_id,
//       resume_tech_stack_id,
//       resume_education_id,
//       resume_career_id,
//     } = req.body;

//     const userId = req.userInfo.id;

//     const REQUIRED_KEYS = {
//       users_name,
//       email,
//       career,
//       birth,
//       phone_number,
//       userId,
//     };

//     Object.keys(REQUIRED_KEYS).map(key => {
//       if (!REQUIRED_KEYS[key]) {
//         const error = new Error(`KEY_ERROR: ${key}`);
//         error.statusCode = 400;
//         throw error;
//       }
//     });

//     await resumeService.postResume(
//       users_name,
//       email,
//       career,
//       birth,
//       phone_number,
//       resume_image,
//       introduce,
//       resume_position_id,
//       resume_tech_stack_id,
//       resume_education_id,
//       resume_career_id,
//       userId
//     );

//     res.status(201).json({ message: 'SAVED_RESUME' });
//   } catch (err) {
//     console.log(err);
//     res.status(err.statusCode).json({ message: err.message });
//   }
// };

module.exports = {
  getuserinfo,
  postuser,
  postposition,
  posttechstack,
  posteducation,
  postcareer,
};
