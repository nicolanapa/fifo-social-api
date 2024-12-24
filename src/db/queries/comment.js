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
        INSERT INTO comment (post_id, user_id, content)
        VALUES ($1, $2, $3);
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
        DELETE FROM comment
        WHERE id = $1;
        `,
        [id],
    );
}

export { getComments, getComment, postComment, deleteComment };
