const companyDao = require('../models/companyDao');

const getCompanyPage = async companyId => {
  const companyPage = await companyDao.getCompanyPage(companyId);

  if (companyPage.companyPage.length === 0) {
    throw new Error ('페이지가 없습니다.')
  }

  return companyPage;
};

module.exports = { getCompanyPage };
