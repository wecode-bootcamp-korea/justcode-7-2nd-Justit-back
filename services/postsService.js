const postsDao = require('../models/postsDao');
var _ = require('lodash');

const getPosts = async (tag, techStack, positionId, location, career) => {
  let tags = [];
  if (typeof (tag) == 'string') {
    tags.push(`"${tag}"`);
  } else if (tag !== undefined && tag.length > 1) {
    for (let i = 0; i < tag.length; i++) {
      tags.push(`"${tag[i]}"`);
    }
  }
  if (tags.length > 1) {
    tags = tags.join(",");
  } else {
    tags = tags[0];
  }

  let techStacks = [];
  if (typeof (techStack) == 'string') {
    techStacks.push(`"${techStack}"`);
  } else if (techStack !== undefined && techStack.length > 1) {
    for (let i = 0; i < techStack.length; i++) {
      techStacks.push(`"${techStack[i]}"`);
    };
  };
  if (techStacks.length > 1) {
    techStacks = techStacks.join(",");
  } else {
    techStacks = techStacks[0];
  };

  let positionIds = [];
  if (typeof (positionId) == 'string') {
    positionIds.push(`"${positionId}"`);
  } else if (positionId !== undefined && positionId.length > 1) {
    for (let i = 0; i < positionId.length; i++) {
      positionIds.push(`"${positionId[i]}"`);
    };
  };
  if (positionIds.length > 1) {
    positionIds = positionIds.join(",");
  } else {
    positionIds = positionIds[0];
  };

  const allPosts = await postsDao.allPosts();
  const tagPosts = await postsDao.tagPosts(tags);
  const techStackPosts = await postsDao.techStackPosts(techStacks);
  const positionPosts = await postsDao.positionPosts(positionId);
  const locationPosts = await postsDao.locationPosts(location);
  const careerPosts = await postsDao.careerPosts(career);

  let filterPosts =
    { tagPosts, techStackPosts, positionPosts, locationPosts, careerPosts };

  filterPosts = filterPosts.tagPosts.concat(
    filterPosts.techStackPosts, filterPosts.positionPosts,
    filterPosts.locationPosts, filterPosts.careerPosts
  );
  filterPosts = _.uniqBy(filterPosts, 'postsId');

  let tagAndTechStackPost = [];
  if (tagPosts.length !== 0 && techStackPosts.length !== 0) {
    for (let i = 0; i < tagPosts.length; i++) {
      for (let j = 0; j < techStackPosts.length; j++) {
        if (tagPosts[i].postsId === techStackPosts[j].postsId) {
          tagAndTechStackPost.push(tagPosts[i]);
        }
      }
    }
  };

  const strAllPosts = allPosts.map(JSON.stringify);
  const strPositionPosts = positionPosts.map(JSON.stringify);
  const strLocationPosts = locationPosts.map(JSON.stringify);
  const strCareerPosts = careerPosts.map(JSON.stringify);

  let anotherPost = strAllPosts;

  if (strPositionPosts.length !== 0) {
    anotherPost = anotherPost.filter(el => strPositionPosts.includes(el));
  };
  if (strLocationPosts.length !== 0) {
    anotherPost = anotherPost.filter(el => strLocationPosts.includes(el));
  };
  if (strCareerPosts.length !== 0) {
    anotherPost = anotherPost.filter(el => strCareerPosts.includes(el));
  };
  anotherPost = anotherPost.map(JSON.parse);

  let result = [];

  if (tagAndTechStackPost.length !== 0) {
    for (let i = 0; i < anotherPost.length; i++) {
      for (let j = 0; j < tagAndTechStackPost.length; j++) {
        if (anotherPost[i].postsId === tagAndTechStackPost[j].postsId) {
          result.push(tagAndTechStackPost[j]);
        }
      }
    }
  };

  if (techStackPosts.length === 0 && tagPosts.length !== 0) {
    for (let i = 0; i < anotherPost.length; i++) {
      for (let j = 0; j < tagPosts.length; j++) {
        if (anotherPost[i].postsId === tagPosts[j].postsId) {
          result.push(tagPosts[j]);
        }
      }
    }
  };

  if (techStackPosts.length !== 0 && tagPosts.length === 0){
    for (let i = 0; i < anotherPost.length; i++) {
      for (let j = 0; j < techStackPosts.length; j++) {
        if (anotherPost[i].postsId === techStackPosts[j].postsId) {
          result.push(techStackPosts[j]);
        }
      }
    }
  };

  if (techStackPosts.length === 0 && tagPosts.length === 0) {
    result = anotherPost;
  };

  if (result.length === 0) {
    throw new Error('게시글이 없습니다.');
  };

  if (filterPosts.length === 0) {
    result = allPosts
  };

  return { result };
}

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

module.exports = { getPosts, getPostsPage };