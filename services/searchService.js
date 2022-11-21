const searchDao = require('../models/searchDao');
var _ = require('lodash');

const searchPosts = async (keyword, tag, techStack, positionId, location, career) => {
  const spe = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;
  if (spe.test(keyword)) {
    throw new Error('특수문자는 사용할 수 없습니다.');
  };

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
    for (let i = 0; i < tag.length; i++) {
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
    positionIds.push(`"${techStack}"`);
  } else if (positionId !== undefined && positionId.length > 1) {
    for (let i = 0; i < tag.length; i++) {
      positionIds.push(`"${techStack[i]}"`);
    };
  };
  if (positionIds.length > 1) {
    positionIds = positionIds.join(",");
  } else {
    positionIds = positionIds[0];
  };

  const searchPosts = await searchDao.searchPosts(keyword);
  const tagPosts = await searchDao.tagPosts(tags);
  const techStackPosts = await searchDao.techStackPosts(techStacks);
  const positionPosts = await searchDao.positionPosts(positionId);
  const locationPosts = await searchDao.locationPosts(location);
  const careerPosts = await searchDao.careerPosts(career);

  let filterPosts =
    { tagPosts, techStackPosts, positionPosts, locationPosts, careerPosts };

  filterPosts = filterPosts.tagPosts.concat(
    filterPosts.techStackPosts, filterPosts.positionPosts,
    filterPosts.locationPosts, filterPosts.careerPosts
  );
  filterPosts = _.uniqBy(filterPosts, 'postsId');

  let result = []
  if (filterPosts.length === 0) {
    result = searchPosts
  } else {
    for (let i = 0; i < searchPosts.length; i++) {
      for (let j = 0; j < filterPosts.length; j++) {
        if (searchPosts[i].postsId === filterPosts[j].postsId) {
          result.push(searchPosts[i]);
        }
      }
    }
  }

  if (result.length === 0) {
    throw new Error('검색 결과가 없습니다.');
  }

  return { result };
}

module.exports = { searchPosts };