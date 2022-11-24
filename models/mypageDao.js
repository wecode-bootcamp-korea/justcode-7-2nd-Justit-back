const myDataSource = require('../middlewares/typeorm');

// 스크랩 추가
const addPostScrap = async (posts_id, userId) => {
  await myDataSource.query(
    `
    INSERT INTO
      scrap
      (posts_id, users_id)
    VALUES
      (${posts_id}, ${userId})

    `
  );
};

// 스크랩 보기
const findPostByUserId = async userId => {
  const findPost = await myDataSource
    .query(
      `
      SELECT
        posts.id AS post_id,
        posts.title,
        company.company_name,
        image.images,
        tech.stack_list
      FROM scrap
      JOIN posts ON posts.id = scrap.posts_id
      JOIN company ON company.id = posts.company_id
      JOIN (SELECT
          company_id,
          JSON_ARRAYAGG(image) AS images
          FROM image
          GROUP BY company_id) AS image ON image.company_id = company.id
      JOIN (SELECT
          posts_tech_stack.posts_id AS id,
          JSON_ARRAYAGG(tech_stack.tech_stack_name) AS stack_list
          FROM posts_tech_stack
          JOIN tech_stack ON tech_stack.id = posts_tech_stack.tech_stack_id
          GROUP BY posts_tech_stack.posts_id) AS tech ON tech.id = posts.id
      WHERE
        users_id = ${userId}
      `
    )
    .then(posts => {
      return [...posts].map(post => {
        return {
          ...post,
          images: JSON.parse(post.images),
          stack_list: JSON.parse(post.stack_list),
        };
      });
    });

  return findPost;
};

// 스크랩 삭제
const deletePost = async (posts_id, userId) => {
  await myDataSource.query(
    `

    DELETE FROM
        scrap
     WHERE
        posts_id = ${posts_id}
     AND
        users_id = ${userId}
  
    `
  );
};

// 메일 변경
const updateUserEmail = async (email, userId) => {
  await myDataSource.query(
    `

    UPDATE
      users
    SET
      email = '${email}'
    WHERE
      id = ${userId}


    `
  );
};

// 계정 탈퇴
const deleteUserById = async (email, userId) => {
  await myDataSource.query(
    `

    DELETE FROM
        users
    WHERE
        email = '${email}'
    AND
        id = ${userId}

    `
  );
};

module.exports = {
  addPostScrap,
  findPostByUserId,
  deletePost,
  updateUserEmail,
  deleteUserById,
};
