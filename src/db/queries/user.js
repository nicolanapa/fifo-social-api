import { publicTable } from "../pool.js";

async function getUser(id) {
    const { rows } = await publicTable.query(
        `
        SELECT * FROM user_account
        INNER JOIN user_info
        ON user_account.id = user_info.user_id
        WHERE user_account.id = $1;
        `,
        [id],
    );

    return rows;
}

async function getUsername(username) {
    const { rows } = await publicTable.query(
        `
        SELECT * FROM user_account
        INNER JOIN user_info
        ON user_account.id = user_info.user_id
        WHERE user_account.username = $1;
        `,
        [username],
    );

    return rows;
}

async function postUser(username, description) {
    console.log(username, description);
}

async function getUsers() {
    const { rows } = await publicTable.query("SELECT * FROM user_account;");

    return rows;
}

export { getUser, getUsername, postUser, getUsers };
