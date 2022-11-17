const myDataSource = require('../middlewares/typeorm');
myDataSource.initialize();

const getPostsPage = async postsId => {
  let postsPage = await myDataSource.query(`
  SELECT
    posts.id, posts.title, ps.tech_stacks, posts.content, posts.career_min, career_max, education_name, posts.due_date
  FROM posts
  LEFT JOIN (
    SELECT
      posts_id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        "id", posts_tech_stack.id,
        "tech_stack", tech_stack.tech_stack_name
      )
    ) as tech_stacks
    FROM
      posts_tech_stack
    JOIN
      tech_stack ON posts_tech_stack.tech_stack_id = tech_stack.id
    GROUP BY
      posts_id
  ) ps ON posts.id = ps.posts_id
  LEFT JOIN education
    ON education.id = posts.education_id
    WHERE posts.id = '${postsId}'
  `);
  postsPage = [...postsPage].map(item => {
    return {
      ...item,
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });

  let postPageInfo = { postsPage };
  return postPageInfo;
}

const findCompanyId = async postsId => {
  const [companyId] = await myDataSource.query(`
  SELECT company_id FROM justit.posts WHERE id = '${postsId}'
  `);

  return companyId;
}

const postsInCompany = async companyId => {
  let company = await myDataSource.query(`
  SELECT
    company.id, company.company_name, ct.tags, ci.images, company.location
  FROM company
  LEFT JOIN (
    SELECT
    company_id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
      "id", id,
      "image", image
      )
    ) as images
    FROM
      image
    GROUP BY
      company_id
  ) as ci ON company.id = ci.company_id
  LEFT JOIN (
    SELECT
    company_id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
      "id", company_tag.id,
        "tag", tag.tag_name
      )
    ) as tags
    FROM
      company_tag
    JOIN
      tag ON company_tag.tag_id = tag.id
    GROUP BY
      company_id
  ) ct ON company.id = ct.company_id
  WHERE id = '${companyId}'
  GROUP BY company.id
`);
  company = [...company].map(item => {
    return {
      ...item,
      tags: JSON.parse(item.tags),
      images: JSON.parse(item.images),
    };
  });

  const companyInfo = { company };
  return companyInfo;
}

const findPostionId = async postsId => {
  const [positionId] = await myDataSource.query(`
  SELECT position_id FROM posts WHERE id = '${postsId}'
  `)
  return positionId;
}

const samePositionPosts = async positionId => {
  let positionPosts = await myDataSource.query(`
  SELECT
    posts.id, co.images, co.company_name, posts.title, ps.tech_stacks,
    co.location, posts.career_min, career_max, view, posts.position_id
  FROM posts
  LEFT JOIN (
      SELECT
    posts_id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
      "id", posts_tech_stack.id,
      "tech_stack", tech_stack.tech_stack_name
      )
    ) as tech_stacks
    FROM
      posts_tech_stack
    JOIN
      tech_stack ON posts_tech_stack.tech_stack_id = tech_stack.id
    GROUP BY
      posts_id
  ) ps ON posts.id = ps.posts_id
  LEFT JOIN
    education
  ON education.id = posts.education_id
  LEFT JOIN (
  SELECT
    company.id, company.company_name, ci.images, company.location
  FROM
    company
  LEFT JOIN (
    SELECT
    company_id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
      "id", id,
      "image", image
      )
    ) as images
    FROM
      image
    GROUP BY
      company_id
    ) as ci ON company.id = ci.company_id
  )as co ON co.id = posts.company_id
  WHERE position_id = '${positionId}'
  LIMIT 8
  `);
  positionPosts = [...positionPosts].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });
  return positionPosts;
}

const addView = async postsId => {
  const viewCount = await myDataSource.query(`
  UPDATE posts SET view = view + 1 WHERE id = '${postsId}'
  `);
  return viewCount;
}

module.exports = {
  getPostsPage, findCompanyId, postsInCompany,
  findPostionId, samePositionPosts, addView
};