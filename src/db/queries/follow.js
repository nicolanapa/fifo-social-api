import { publicTable } from "../pool.js";

async function alreadyFollowsUser(userId, followedId) {
    const { rows } = await publicTable.query(
        `
        SELECT EXISTS (SELECT * FROM user_follows
        WHERE user_id = $1 AND followed_id = $2)::boolean;`,
        [userId, followedId],
    );

    return rows[0].exists;
}

async function addFollow(userId, followedId) {
    await publicTable.query(
        `
        INSERT INTO user_follows (user_id, followed_id)
        VALUES ($1, $2);
        `,
        [userId, followedId],
    );
}

async function removeFollow(userId, followedId) {
    await publicTable.query(
        `
        DELETE FROM user_follows
        WHERE user_id = $1 AND followed_id = $2;
        `,
        [userId, followedId],
    );
}

async function getFollowers(userId) {
    const { rows } = await publicTable.query(
        `
        SELECT * FROM user_follows
        WHERE followed_id = $1;`,
        [userId],
    );

    return rows;
}

async function getFollowed(userId) {
    const { rows } = await publicTable.query(
        `
        SELECT * FROM user_follows
        WHERE user_id = $1;`,
        [userId],
    );

    return rows;
}

export {
    alreadyFollowsUser,
    addFollow,
    removeFollow,
    getFollowers,
    getFollowed,
};
