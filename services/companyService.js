const companyDao = require('../models/companyDao');

const company = async (companyId) => {
  const companyPage = await companyDao.company(companyId)
  return companyPage
}

module.exports = { company }