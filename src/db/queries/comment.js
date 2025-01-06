import { publicTable } from "../pool.js";

async function getComments() {
    const { rows } = await publicTable.query(
        `
        SELECT *, (SELECT COUNT(comment_id) AS likes FROM comment_like WHERE comment_like.comment_id = comment.id) 
        FROM comment
        GROUP BY comment.id;
        `,
    );

    return rows;
}

async function getComment(id) {
    const { rows } = await publicTable.query(
        `
        SELECT *, (SELECT COUNT(comment_id) AS likes FROM comment_like WHERE comment_like.comment_id = comment.id) 
        FROM comment
        WHERE comment.id = $1;
        `,
        [id],
    );

    return rows;
}

async function postComment(postId, userId, content) {
    await publicTable.query(
        `
        INSERT INTO comment (post_id, user_id, content, creation_date)
        VALUES ($1, $2, $3, (SELECT now()));
        `,
        [postId, userId, content],
    );
}

async function deleteComment(id) {
    await publicTable.query(
        `
        DELETE FROM comment_like
        WHERE comment_id = $1;
        `,
        [id],
    );

    await publicTable.query(
        `
        DELETE FROM favorite_comment
        WHERE comment_id = $1;
        `,
        [id],
    );

    await publicTable.query(
        `
        DELETE FROM comment
        WHERE id = $1;
        `,
        [id],
    );
}

async function updateComment(id, content) {
    await publicTable.query(
        `
        UPDATE comment
        SET content = $2
        WHERE id = $1;
        `,
        [id, content],
    );
}

async function getLikeStatus(commentId, userId) {
    const { rows } = await publicTable.query(
        `
        SELECT * FROM comment_like
        WHERE comment_id = $1 AND user_id = $2;
        `,
        [commentId, userId],
    );

    return rows;
}

async function addLike(commentId, userId) {
    await publicTable.query(
        `
        INSERT INTO comment_like (comment_id, user_id)
        VALUES ($1, $2);
        `,
        [commentId, userId],
    );
}

async function removeLike(commentId, userId) {
    await publicTable.query(
        `
        DELETE FROM comment_like
        WHERE comment_id = $1 AND user_id = $2;
        `,
        [commentId, userId],
    );
}

export {
    getComments,
    getComment,
    postComment,
    deleteComment,
    updateComment,
    getLikeStatus,
    addLike,
    removeLike,
};
