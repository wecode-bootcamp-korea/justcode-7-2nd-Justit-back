const myDataSource = require('../middlewares/typeorm');

//간단소개 post APi, 다중선택 다 업데이트로 처리
//개발직무 post API, 다중선택
//기술스택 post APi, 다중선택 (null로 들어가도록)
//학력 (users_id, year_month, school_id, resume_education_name, department, status) post APi, delete API, 다중선택, 학력 여러개
//경력 (users_id, year_month, resume_career_name, introduce, department, tech_stack_id, result) post APi, delete API, 다중선택
const updateResume = async (
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
  resume_career_id
) => {
  //우선 아이디했을때 기본 정보 get (이멜, 폰번)

  let getInfo = await myDataSource.query(
    `SELECT email, phone_number FROM users WHERE id = '${userId}'`
  );

  // 이멜, 폰번 제외 처음 입력하는 정보
  let postInfo = await myDataSource.query(
    `INSERT INTO users (users_name, birth) VALUES ('${users_name}', ${birth})`,
    `INSERT INTO resume (career, resume_image, introduce, resume_position_id,resume_tech_stack_id,resume_education_id,resume_career_id) VALUES
  ('${career}', '${resume_image}', '${introduce}', ${resume_position_id}, ${resume_tech_stack_id}, ${resume_education_id}, ${resume_career_id})`
  );

  // 정보 수정
  let updateInfo = await myDataSource.query(
    `UPDATE users 
    SET users_name = '${users_name}', 
    email = '${email}', 
    birth = ${birth}, 
    phone_number = '${phone_number}' 
    WHERE id = users.id`,
    `UPDATE resume SET career = '${career}', 
    resume_image = '${resume_image}', 
    introduce = '${introduce}', 
    resume_position_id = ${resume_position_id}, 
    resume_tech_stack_id = ${resume_tech_stack_id}, 
    resume_education_id = ${resume_education_id}, 
    resume_career_id = ${resume_career_id}
    WHERE resume.users_id = ${userId}`
  );

  //   //resume-position
  //   SELECT id, users_id, JSON_ARRAYAGG(JSON_OBJECT("position_id" : resume_position_id)) FROM resume
  //   LEFT JOIN users ON users_id = users.id
};
module.exports = { updateResume };
