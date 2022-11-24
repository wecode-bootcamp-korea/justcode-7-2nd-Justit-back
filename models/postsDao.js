const myDataSource = require('../middlewares/typeorm');

const allPosts = async () => {
  let allPost = await myDataSource.query(`
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
  ORDER BY posts.created_at DESC;
`)

  allPost = [...allPost].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });

  return allPost
}

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

  tagPost = [...tagPost].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });

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

  techStackPost = [...techStackPost].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });

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

  positionPost = [...positionPost].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });

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

  locationPost = [...locationPost].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });

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

  careerPost = [...careerPost].map(item => {
    return {
      ...item,
      images: JSON.parse(item.images),
      tech_stacks: JSON.parse(item.tech_stacks),
    };
  });

  return careerPost;
};


const getPostsPage = async postsId => {
  let postsPage = await myDataSource.query(`
  SELECT
    posts.id, posts.title, co.company_name, tags, ps.tech_stacks, content,
    career_min, career_max, education.education_name, due_date, co.location,
    co.images, view, posts.position_id, posts.company_id
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
  WHERE posts.id = '${postsId}'
`);
  postsPage = [...postsPage].map(item => {
    return {
      ...item,
      tags: JSON.parse(item.tags),
      tech_stacks: JSON.parse(item.tech_stacks),
      images: JSON.parse(item.images)
    };
  });

  let postPageInfo = { postsPage };

  return postPageInfo;
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
  allPosts,
  tagPosts,
  techStackPosts,
  positionPosts,
  locationPosts,
  careerPosts,
  getPostsPage,
  findPostionId,
  samePositionPosts,
  addView
};