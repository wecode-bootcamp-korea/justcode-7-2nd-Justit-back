const myDataSource = require('../middlewares/typeorm');

//맨 처음 들어갔을때 기본 정보 get (이멜, 폰번)
const getuserinfo = async userId => {
  let getInfo = await myDataSource.query(
    `SELECT 
    users_name, email
    FROM users 
    WHERE id = ${userId}`
  );
  return getInfo;
};

//phone-number update

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
  let resume = await myDataSource.query(
    //resume table에 users_id 값이 not null인데 값 넣는걸 누락해서 문제가 발생 --실수한 부분***
    `INSERT INTO resume (users_id, birth, career, resume_image, introduce) VALUES (${userId}, ${birth}, '${career}', '${resume_image}', '${introduce}')`
  );
  let resume_position = await myDataSource.query(
    //position table에 값이 있어야 포린키로 끌어오기 가능
    `INSERT INTO resume_position (users_id, position_id) VALUES (${userId}, ${position_id})`
  );
  let resume_tech_stack = await myDataSource.query(
    `INSERT INTO resume_tech_stack (users_id, tech_stack_id) VALUES (${userId}, ${tech_stack_id})`
  );
  let resume_education = await myDataSource.query(
    `INSERT INTO resume_education (users_id, education_year_month, education_id, resume_education_name, education_department) VALUES (${userId}, ${education_year_month}, ${education_id}, '${resume_education_name}', '${education_department}')`
  );
  let resume_career = await myDataSource.query(
    `INSERT INTO resume_career (users_id, career_year_month, resume_career_name, career_introduce, career_department, career_tech_stack_id, result) VALUES (${userId}, ${career_year_month}, '${resume_career_name}', '${career_introduce}', '${career_department}', ${career_tech_stack_id}, '${result}')`
  );

  return {
    resume,
    resume_position,
    resume_tech_stack,
    resume_education,
    resume_career,
  };
};

const updateResume = async (
  users_name,
  career,
  birth,
  resume_image,
  introduce,
  users_id,
  position_id,
  tech_stack_id,
  education_id,
  career_id
) => {
  let updateInfo = await myDataSource.query(
    `UPDATE users as U, resume as R, resume_position as RP, resume_tech_stack as RT, resume_education as RE, resume_career as RC
    SET U.users_name = '${users_name}', 
    R.birth = ${birth}, R.career = '${career}' R.resume_image = '${resume_image}', R.introduce = '${introduce}',
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

module.exports = {
  getuserinfo,
  postResume,
  updateResume,
};