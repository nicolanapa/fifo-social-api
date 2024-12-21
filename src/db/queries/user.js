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

async function getUsers() {
    const { rows } = await publicTable.query("SELECT * FROM user_account;");

    return rows;
}

export { getUser, getUsers };
