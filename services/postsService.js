const postsDao = require('../models/postsDao');

const getPostsPage = async postsId => {
  const postsPage = await postsDao.getPostsPage(postsId);
  const findCompanyId = await postsDao.findCompanyId(postsId);
  const companyId = findCompanyId.company_id;
  const postsInCompany = await postsDao.postsInCompany(companyId);
  const findPostionId = await postsDao.findPostionId(postsId);
  const positionId = findPostionId.position_id;
  const samePositionPosts = await postsDao.samePositionPosts(positionId);
  await postsDao.addView(postsId);
  const result = { postsPage, postsInCompany, samePositionPosts };
  return result;
}

module.exports = { getPostsPage };