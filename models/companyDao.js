const myDataSource = require('../middlewares/typeorm');

const getCompanyPage = async companyId => {
  let companyPage = await myDataSource.query(`
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

  let companyPosts = await myDataSource.query(`
  SELECT
    posts.id, posts.due_date, posts.title, ps.tech_stacks, posts.company_id
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
  WHERE company_id = '${companyId}'
`);

  let result = { companyPage, companyPosts };
  return result;
};

module.exports = { getCompanyPage };
