const myDataSource = require('../middlewares/typeorm');

const randomPosts = async () => {
  let ramdompost = await myDataSource.query(`
  SELECT
    posts.id, co.images, co.company_name, posts.title,
    view > 60 as popular
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
  HAVING popular = 1
  ORDER BY RAND()
  LIMIT 5;
  `)

  ramdompost = [...ramdompost].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
    };
  });

  return ramdompost;
};

const timeLimitPosts = async () => {
  let timeLimitPost = await myDataSource.query(`
  SELECT
    posts.id, co.images, co.company_name, posts.title, ps.tech_stacks, co.location,
    posts.career_min, career_max, view, posts.position_id, posts.company_id,
    posts.due_date,
  NOT posts.due_date ='상시' as noal
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
  HAVING noal = 1
  ORDER BY posts.due_date
  LIMIT 8;
  `);

  timeLimitPost = [...timeLimitPost].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });

  return timeLimitPost;
};

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

  return popularPost;
};

const responseFastCompany = async () => {
  let asapCompany = await myDataSource.query(`
  SELECT
    posts.id, co.images, co.company_name, posts.title, ps.tech_stacks, co.location,
    posts.career_min, career_max, view, posts.due_date, posts.position_id, posts.company_id
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
  WHERE tags LIKE '%QUICKLY_FEEDBACK_COMPANY%';
  `);

  asapCompany = [...asapCompany].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });

  return asapCompany;
};

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
`);

  posts = [...posts].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });

  return posts;
};

module.exports = {
  randomPosts,
  timeLimitPosts,
  popularPosts,
  responseFastCompany,
  newPosts
};