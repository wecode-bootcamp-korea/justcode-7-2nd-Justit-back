const searchDao = require('../models/searchDao');

const searchPosts = async (keyword, tag) => {
  if (keyword.length === 0) {
    throw new Error('검색어를 입력해 주세요')
  }
  let tags = []
  if (tag === undefined) {
    let searchPosts = await searchDao.searchPosts(keyword)
    return searchPosts
  } else if (typeof (tag) == 'string') {
    tags.push(`"${tag}"`)
  } else if (tag !== undefined && tag.length > 1) {
    for (let i = 0; i < tag.length; i++) {
      tags.push(`"${tag[i]}"`)
    }
  }
  tags = tags.join(",")
  let searchPosts = await searchDao.searchPosts(keyword)
  const tagPosts = await searchDao.tagPosts(tags)




  //   tag.forEach((v) => {
  //   tags.push(`"${v}"`);
  // })

  console.log(tags)


  if (searchPosts.length === 0) {
    throw new Error('검색 결과가 없습니다')
  }
  const result = { searchPosts, tagPosts }
  return result
}

module.exports = { searchPosts }