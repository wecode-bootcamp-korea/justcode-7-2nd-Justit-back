const resumeService = require('../services/resumeService');

const postResume = async (req, res) => {
  try {
    const {} = req.body;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

//정보 가져오기 (get users_name, email, birth, phoneNumber, resume_image)
//birth 없으면 등록 (메일변경, 번호변경 누르면 계정설정으로 넘어가는거 안할건지 물어보기)
//이름 수정

//간단소개 post APi, delete API, 다중선택
//개발직무 post APi, delete API, 다중선택
//기술스택 post APi, delete API, 다중선택
//학력 (users_id, year_month, school_id, resume_education_name, department, status) post APi, delete API, 다중선택, 학력 여러개
//경력 (users_id, year_month, resume_career_name, introduce, department, tech_stack_id, result) post APi, delete API, 다중선택

//수정버튼 따로 있는게 아니라,, 처음 저장하기 누르면 post, 두번째부터는 내용수정 put

module.exports = { postResume };
