const companyDao = require('../models/companyDao');

const getCompanyPage = async companyId => {
  const companyPage = await companyDao.getCompanyPage(companyId);
  return companyPage;
};

module.exports = { getCompanyPage };
