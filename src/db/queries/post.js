import { publicTable } from "../pool.js";

async function getPosts() {
    const { rows } = await publicTable.query(
        `
        SELECT *, (SELECT COUNT(post_id) AS likes FROM post_like WHERE post_like.post_id = post.id) 
        FROM post 
        GROUP BY post.id;
        `,
    );

    return rows;
}

async function getPostsLike(title) {
    const { rows } = await publicTable.query(
        `
        SELECT *, (SELECT COUNT(post_id) AS likes FROM post_like WHERE post_like.post_id = post.id) 
        FROM post 
        WHERE LOWER(post.title) LIKE LOWER($1);
        `,
        ["%" + title + "%"],
    );

    return rows;
}

async function getPost(id) {
    const { rows } = await publicTable.query(
        `
        SELECT *, (SELECT COUNT(post_id) AS likes FROM post_like WHERE post_like.post_id = post.id) 
        FROM post 
        WHERE post.id = $1;
        `,
        [id],
    );

    return rows;
}

async function postPost(userId, title, content) {
    await publicTable.query(
        `
        INSERT INTO post (user_id, title, content, creation_date)
        VALUES ($1, $2, $3, (SELECT now()));
        `,
        [userId, title, content],
    );
}

async function deletePost(id) {
    await publicTable.query(
        `
        DELETE FROM post_like
        WHERE post_id = $1;
        `,
        [id],
    );

    await publicTable.query(
        `
        DELETE FROM comment_like
        WHERE comment_id IN (SELECT id FROM comment WHERE post_id = $1);
        `,
        [id],
    );

    await publicTable.query(
        `
        DELETE FROM favorite_post
        WHERE post_id = $1;
        `,
        [id],
    );

    await publicTable.query(
        `
        DELETE FROM favorite_comment
        WHERE comment_id IN (SELECT id FROM comment WHERE post_id = $1);
        `,
        [id],
    );

    await publicTable.query(
        `
        DELETE FROM comment
        WHERE post_id = $1;
        `,
        [id],
    );

    await publicTable.query(
        `
        DELETE FROM post
        WHERE id = $1;
        `,
        [id],
    );
}

async function updatePost(id, title, content) {
    await publicTable.query(
        `
        UPDATE post
        SET title = $2, content = $3
        WHERE id = $1;
        `,
        [id, title, content],
    );
}

async function getAllComments(id) {
    const { rows } = await publicTable.query(
        `
        SELECT *, (SELECT COUNT(comment_id) AS likes FROM comment_like WHERE comment_like.comment_id = comment.id) 
        FROM comment 
        WHERE post_id = $1;
        `,
        [id],
    );

    return rows;
}

async function getLikeStatus(postId, userId) {
    const { rows } = await publicTable.query(
        `
        SELECT * FROM post_like
        WHERE post_id = $1 AND user_id = $2;
        `,
        [postId, userId],
    );

    return rows;
}

async function addLike(postId, userId) {
    await publicTable.query(
        `
        INSERT INTO post_like (post_id, user_id)
        VALUES ($1, $2);
        `,
        [postId, userId],
    );
}

async function removeLike(postId, userId) {
    await publicTable.query(
        `
        DELETE FROM post_like
        WHERE post_id = $1 AND user_id = $2;
        `,
        [postId, userId],
    );
}

export {
    getPosts,
    getPostsLike,
    getPost,
    postPost,
    deletePost,
    updatePost,
    getAllComments,
    getLikeStatus,
    addLike,
    removeLike,
};
