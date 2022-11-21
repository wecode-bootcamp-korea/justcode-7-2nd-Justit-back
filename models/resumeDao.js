const myDataSource = require('../middlewares/typeorm');

//맨 처음 들어갔을때 기본 정보 get (이멜, 폰번)
const getuserinfo = async userId => {
  let getInfo = await myDataSource.query(
    `SELECT users_name, email, phone_number FROM users WHERE id = '${userId}'`
  );
  return getInfo; //가입할때 이름 정보 등록되나?
};

//

const postResume = async () => {
  let resumeuser = await myDataSource.query(
    `INSERT ALL
    INTO users (birth) VALUES (${birth}),
    INTO resume (career, resume_image, introduce) VALUES ('${career}', '${resume_image}', '${introduce}')
    INTO resume_position (users_id, resume_position_id) VALUES (${users_id}, ${position_id})
    INTO resume_tech_stack (users_id, resume_tech-stack_id) VALUES (${users_id}, ${position_id})
    INTO resume_education (users_id, resume_education_id) VALUES (${users_id}, ${position_id})
    INTO resume_career (users_id, resume_career_id) VALUES (${users_id}, ${position_id})
    `
  );
  return resumeuser;
};

// const postposition = async () => {
//   let resumeposition = await myDataSource.query(
//     `INSERT INTO resume (resume_position_id) VALUES ('${resume_position_id}')`
//   );
//   return resumeposition;
// };

// const posttechstack = async () => {
//   let resumetechstack = await myDataSource.query(
//     `INSERT INTO resume (resume_teck_stack_id) VALUES ('${resume_teck_stack_id}')`
//   );
//   return resumetechstack;
// };

// const posteducation = async () => {
//   let resumeeducation = await myDataSource.query(
//     `INSERT INTO resume (resume_education_id) VALUES ('${resume_education_id}')`
//   );
//   return resumeeducation;
// };

// const postcareer = async () => {
//   let resumecareer = await myDataSource.query(
//     `INSERT INTO resume (resume_career_id) VALUES ('${resume_career_id}')`
//   );
//   return resumecareer;
// };

const updateResume = async (
  users_name,
  career,
  birth,
  resume_image,
  introduce
) => {
  let updateInfo = await myDataSource.query(
    `UPDATE users as U, resume as R, resume_position as RP, resume_tech_stack as RT, resume_education as RE, resume_career as RC
    SET U.users_name = '${users_name}', U.birth = ${birth},
    R.career = '${career}' R.resume_image = '${resume_image}', R.introduce = '${introduce}',
    RP.users_id = ${users_id}, RP.resume_position_id = ${position_id},
    RT.users_id = ${users_id}, RT.resume_tech_stack_id = ${tech_stack_id},
    RE.users_id = ${users_id}, RE.resume_education_id = ${education_id},
    RC.users_id = ${users_id}, RC.resume_career_id = ${career_id}
    WHERE U.users_id = ${userId}
    AND WHERE R.users_id = U.users_id
    AND WHERE RP.users_id = U.users_id
    AND WHERE RT.users_id = U.users_id
    AND WHERE RE.users_id = U.users_id
    AND WHERE RC.users_id = U.users_id`
  );
  return updateInfo;
};

//모두 저장하기 버튼에 실행할 수 있는가
module.exports = {
  getuserinfo,
  postResume,
  updateResume,
};
