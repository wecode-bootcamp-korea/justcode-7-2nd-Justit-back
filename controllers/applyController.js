const { FindOptionsUtils } = require('typeorm');
const applyService = require('../services/applyService');
const utils = require('../utils/myutils');

//지원하기 모달창
const getresume = async (req, res) => {
  const resumeInfo = await applyService.getresume(req.userInfo.id);

  res.status(200).json({ resumeInfo }); //userinfo 에 담겨오는 정보를 보여달라
};

//지원하기 1번 postAPI
const applyFirst = async (req, res) => {
  const { posts_id, apply_status } = req.body;
  const userId = req.userInfo.id;

  utils.checkDataIsNotEmpty({
    posts_id,
    userId,
    apply_status,
  });

  await applyService.applyFirst(posts_id, userId, apply_status);
  res.status(200).json({ message: 'ADDED_TO_APPLY_ING' });
};

//마이점핏-작성중 getAPI
const getApplying = async (req, res) => {
  const applyingInfo = await applyService.getApplying(req.userInfo.id);

  res.status(200).json({ applyingInfo });
};

//지원하기 2번 updateAPI
const applySecond = async (req, res) => {
  const { apply_status, posts_id } = req.body;
  const userId = req.userInfo.id;

  utils.checkDataIsNotEmpty({
    userId,
    apply_status,
    posts_id,
  });

  await applyService.applySecond(userId, apply_status, posts_id);
  res.status(200).json({ message: 'CHANGED_TO_APPLY_ED' });
};

//마이점핏-지원완료 getAPI
const getApplyed = async (req, res) => {
  const applyedInfo = await applyService.getApplyed(req.userInfo.id);

  res.status(200).json({ applyedInfo });
};
module.exports = {
  getresume,
  getApplyed,
  getApplying,
  applyFirst,
  applySecond,
};
