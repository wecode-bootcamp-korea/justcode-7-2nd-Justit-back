const postsDao = require('../models/postsDao');

const getPostsPage = async (postsId) => {
  const postsPage = await postsDao.getPostsPage(postsId);
  const findCompanyId = await postsDao.findCompanyId(postsId);
  const companyId = findCompanyId.company_id;
  const postsInCompany = await postsDao.postsInCompany(companyId);
  const result = { postsPage, postsInCompany }
  return result
}

module.exports = { getPostsPage }