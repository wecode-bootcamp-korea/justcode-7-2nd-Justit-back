const applyService = require('../services/applyService');
//const utils = require('../utils/myutils');

const getresume = async (req, res) => {
  const resumeInfo = await applyService.getresume(req.userInfo.id);

  res.status(200).json({ resumeInfo }); //userinfo 에 담겨오는 정보를 보여달라
};

module.exports = {
  getresume,
};
