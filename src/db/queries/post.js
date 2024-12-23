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
        DELETE post
        WHERE id = $1;
        `,
        [id],
    );
}

export { getPosts, getPost, deletePost };
