const applyDao = require('../models/applyDao');
const jwt = require('jsonwebtoken');

const getresume = async userId => {
  const resumeInfo = await applyDao.getresume(userId);
  return resumeInfo;
};

const applyFirst = async (posts_id, userId, apply_status) => {
  const applyfirst = await applyDao.applyFirst(posts_id, userId, apply_status);
  return applyfirst;
};

const getApplyed = async userId => {
  const resumeInfo = await applyDao.getApplyed(userId);
  return resumeInfo;
};

const applySecond = async (userId, apply_status, posts_id) => {
  const applysecond = await applyDao.applySecond(
    userId,
    apply_status,
    posts_id
  );
  return applysecond;
};
const getApplying = async userId => {
  const resumeInfo = await applyDao.getApplying(userId);
  return resumeInfo;
};

module.exports = {
  getresume,
  getApplyed,
  getApplying,
  applyFirst,
  applySecond,
};
