const myDataSource = require('../middlewares/typeorm');

const searchPosts = async keyword => {
  let searchPost = await myDataSource.query(`
  SELECT
    posts.id as postsId, co.images, co.company_name, posts.title, ps.tech_stacks,
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
  LEFT JOIN education
  ON education.id = posts.education_id
  LEFT JOIN (
    SELECT
      company.id, company.company_name, ci.images, company.location
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
  )as co ON co.id = posts.company_id
  WHERE (content LIKE '%${keyword}%' or title LIKE '%${keyword}%')
`);

  return searchPost;
};

const tagPosts = async tags => {
  let tagPost = await myDataSource.query(`
  SELECT
    posts.id as postsId, co.images, co.company_name, posts.title, ps.tech_stacks,
    co.location, posts.career_min, career_max, view, posts.position_id
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
      WHERE tag.tag_name IN (${tags})
      GROUP BY
        company_id
      HAVING COUNT(tag_id) >= '1'
    ) ct ON company.id = ct.company_id
  )as co ON co.id = posts.company_id
  WHERE NOT tags is NULL
`)

  return tagPost;
};

const techStackPosts = async techStacks => {
  let techStackPost = await myDataSource.query(`
  SELECT
    posts.id as postsId, co.images, co.company_name, posts.title, ps.tech_stacks,
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
    WHERE tech_stack.tech_stack_name IN (${techStacks})
    GROUP BY
      posts_id
    HAVING COUNT(tech_stack_id) >= 1
  ) ps ON posts.id = ps.posts_id
  LEFT JOIN education
  ON education.id = posts.education_id
  LEFT JOIN (
    SELECT
      company.id, company.company_name, ci.images, company.location
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
  )as co ON co.id = posts.company_id
  WHERE NOT tech_stacks is NULL
`);

  return techStackPost;
};

const positionPosts = async positionId => {
  let positionPost = await myDataSource.query(`
  SELECT
    posts.id as postsId, co.images, co.company_name, posts.title, ps.tech_stacks,
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
  LEFT JOIN education
  ON education.id = posts.education_id
  LEFT JOIN (
    SELECT
      company.id, company.company_name, ci.images, company.location
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
  )as co ON co.id = posts.company_id
  WHERE position_id IN (${positionId})
`);

  return positionPost;
};

const locationPosts = async location => {
  let locationPost = await myDataSource.query(`
  SELECT
    posts.id as postsId, co.images, co.company_name, posts.title, ps.tech_stacks,
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
  LEFT JOIN education
  ON education.id = posts.education_id
  LEFT JOIN (
    SELECT
      company.id, company.company_name, ci.images, company.location
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
  )as co ON co.id = posts.company_id
  WHERE location LIKE '%${location}%';
`);

  return locationPost;
};

const careerPosts = async career => {
  let careerPost = await myDataSource.query(`
  SELECT
    posts.id as postsId, co.images, co.company_name, posts.title, ps.tech_stacks,
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
  LEFT JOIN education
  ON education.id = posts.education_id
  LEFT JOIN (
    SELECT
      company.id, company.company_name, ci.images, company.location
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
  )as co ON co.id = posts.company_id
  HAVING career_min <= ${career} AND ${career} <= career_max
`);

  return careerPost;
};

module.exports = {
  searchPosts,
  tagPosts,
  techStackPosts,
  positionPosts,
  locationPosts,
  careerPosts }