const myDataSource = require('../middlewares/typeorm');

//맨 처음 들어갔을때 기본 정보 get (이멜, 폰번)

// const getuserinfo = async userId => {
//   let [getInfo] = await myDataSource.query(
//     `SELECT
//     users_name, email
//     FROM users
//     WHERE id = '${userId}'`
//   );
//   return getInfo;
// };

const getresumeinfo = async userId => {
  let [getresume] = await myDataSource.query(
    `SELECT
        U.users_name, U.email, U.phone_number, 
        R.resume_image, R.introduce, R.birth, R.career, 
        P.position_id,
        T.tech_stack_id,
        E.education_year_month, E.education_id, E.resume_education_name, E.education_department,
        C.career_year_month, C.resume_career_name, C.career_introduce, C.career_department, C.career_tech_stack_id
      FROM users U
      LEFT JOIN resume R ON U.id = R.users_id
      LEFT JOIN resume_position P ON U.id = P.users_id
      LEFT JOIN resume_tech_stack T ON U.id = T.users_id
      LEFT JOIN resume_education E ON U.id = E.users_id
      LEFT JOIN resume_career C ON U.id = C.users_id
      WHERE U.id = '${userId}'`
  );
  return getresume;
};

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
    `INSERT INTO 
    resume (users_id, birth, career, resume_image, introduce) 
    VALUES (${userId}, ${birth}, '${career}', '${resume_image}', '${introduce}')`
  );
  let resume_position = await myDataSource.query(
    //position table에 값이 있어야 포린키로 끌어오기 가능
    `INSERT INTO 
    resume_position (users_id, position_id) 
    VALUES (${userId}, ${position_id})` //***리팩토링 할 부분 : 다중으로 데이터 들어오기
  );
  let resume_tech_stack = await myDataSource.query(
    `INSERT INTO 
    resume_tech_stack (users_id, tech_stack_id) 
    VALUES (${userId}, ${tech_stack_id})`
  );
  let resume_education = await myDataSource.query(
    `INSERT INTO resume_education (users_id, education_year_month, education_id, resume_education_name, education_department) 
    VALUES (${userId}, ${education_year_month}, ${education_id}, '${resume_education_name}', '${education_department}')`
  );
  let resume_career = await myDataSource.query(
    `INSERT INTO resume_career (users_id, career_year_month, resume_career_name, career_introduce, career_department, career_tech_stack_id, result) 
    VALUES (${userId}, ${career_year_month}, '${resume_career_name}', '${career_introduce}', '${career_department}', ${career_tech_stack_id}, '${result}')`
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
) => {
  let updateInfo = await myDataSource.query(
    `UPDATE 
      users as U, resume as R, resume_position as RP, resume_tech_stack as RT, resume_education as RE, resume_career as RC
    SET 
      U.users_name = '${users_name}', U.phone_number = '${phone_number}',
      R.birth = ${birth}, R.career = '${career}', R.resume_image = '${resume_image}', R.introduce = '${introduce}',
      RP.users_id = ${userId}, RP.position_id = ${position_id},
      RT.users_id = ${userId}, RT.tech_stack_id = ${tech_stack_id},
      RE.users_id = ${userId}, RE.education_year_month ='${education_year_month}', 
      RE.education_id = ${education_id}, RE.resume_education_name= '${resume_education_name}', RE.education_department = '${education_department}',
      RC.users_id = ${userId}, RC.career_year_month = '${career_year_month}', RC.resume_career_name = '${resume_career_name}', 
     RC.career_introduce = '${career_introduce}', RC.career_department = '${career_department}', RC.career_tech_stack_id = ${career_tech_stack_id}, RC.result = '${result}'
    WHERE 
      U.id = ${userId}
      AND R.users_id = ${userId}
      AND RP.users_id = ${userId}
      AND RT.users_id = ${userId}
      AND RE.users_id = ${userId}
      AND RC.users_id = ${userId}`
  );
  return updateInfo;
};

// get 함수 (join)
module.exports = {
  //getuserinfo,
  getresumeinfo,
  postResume,
  updateResume,
};
