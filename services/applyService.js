const applyDao = require('../models/applyDao');
const jwt = require('jsonwebtoken');

const getresume = async userId => {
  const resumeInfo = await applyDao.getresume(userId);
  return resumeInfo;
};
module.exports = {
  getresume,
};
