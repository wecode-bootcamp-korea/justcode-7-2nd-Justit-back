const myDataSource = require('../middlewares/typeorm');

const searchPosts = async (keyword, tag) => {
  let tags = implode("','", tag)
  console.log(tags)
  let findPost = await myDataSource.query(`
  SELECT
    posts.id, co.images, co.company_name, posts.title, ps.tech_stacks,
    co.location, posts.career_min, career_max, view, posts.position_id,
    posts.company_id
  FROM posts
    LEFT JOIN (
        SELECT
      posts_id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
        "id", tech_stack.id,
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
    LEFT JOIN (
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
        "id", tag.id,
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
  )as co ON co.id = posts.company_id
  WHERE (content LIKE '%${keyword}%' or title LIKE '%${keyword}%'
  or tags LIKE '%${tagArray}%')
  `);
  // findPost = [...findPost].map(item => {
  //     return {
  //       ...item,
  //       images: JSON.parse(item.images),
  //       tech_stacks: JSON.parse(item.tech_stacks),
  //     };
  //   });
    return findPost
  }









module.exports = { searchPosts }