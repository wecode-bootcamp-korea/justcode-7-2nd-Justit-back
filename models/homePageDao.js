const myDataSource = require('../middlewares/typeorm');

const popularPosts = async () => {
  let popularPost = await myDataSource.query(`
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
  LEFT JOIN education
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
  ORDER BY view DESC
  LIMIT 8
`)
  popularPost = [...popularPost].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });

  return popularPost
}

const responseFastCompany = async () => {
  let asapCompany = await myDataSource.query(`
  SELECT
    posts.id, co.images, co.company_name, posts.title, ps.tech_stacks, co.location,
    posts.career_min, career_max, view, posts.position_id, posts.company_id
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
  WHERE tags LIKE '%지원%';
  `)
  asapCompany = [...asapCompany].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });
  return asapCompany
}

const newPosts = async () => {
  let posts = await myDataSource.query(`
  SELECT
    posts.id, co.images, co.company_name, posts.title, ps.tech_stacks, co.location, posts.career_min, career_max, view, posts.position_id
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
  ORDER BY created_at DESC
  LIMIT 8;
`)
  posts = [...posts].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });

  return posts
}

module.exports = { popularPosts, responseFastCompany, newPosts }