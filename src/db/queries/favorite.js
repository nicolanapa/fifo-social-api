import { publicTable } from "../pool.js";

async function getPosts(userId) {
    const { rows } = await publicTable.query(
        `
        SELECT *, (SELECT COUNT(post_id) AS likes FROM post_like WHERE post_like.post_id = post.id) 
        FROM post 
        WHERE post.id IN (SELECT post_id FROM favorite_post WHERE user_id = $1);
        `,
        [userId],
    );

    return rows;
}

async function getComments(userId) {
    const { rows } = await publicTable.query(
        `
        SELECT *, (SELECT COUNT(comment_id) AS likes FROM comment_like WHERE comment_like.comment_id = comment.id) 
        FROM comment 
        WHERE comment.id IN (SELECT comment_id FROM favorite_comment WHERE user_id = $1);
        `,
        [userId],
    );

    return rows;
}

async function addFavorite(userId, xId, typeOfFavorite) {
    if (typeOfFavorite === "post") {
        await publicTable.query(
            `
            INSERT INTO favorite_post (user_id, post_id)
            VALUES ($1, $2);
            `,
            [userId, xId],
        );
    } else if (typeOfFavorite === "comment") {
        await publicTable.query(
            `
            INSERT INTO favorite_comment (user_id, comment_id)
            VALUES ($1, $2);
            `,
            [userId, xId],
        );
    }
}

async function removeFavorite(userId, xId, typeOfFavorite) {
    if (typeOfFavorite === "post") {
        await publicTable.query(
            `
            DELETE FROM favorite_post
            WHERE user_id = $1 AND post_id = $2;
            `,
            [userId, xId],
        );
    } else if (typeOfFavorite === "comment") {
        await publicTable.query(
            `
            DELETE FROM favorite_comment
            WHERE user_id = $1 AND comment_id = $2;
            `,
            [userId, xId],
        );
    }
}

export { getPosts, getComments, addFavorite, removeFavorite };
