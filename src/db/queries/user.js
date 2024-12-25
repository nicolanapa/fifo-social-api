import { publicTable, privateTable } from "../pool.js";

async function getUsers() {
    const { rows } = await publicTable.query(`
        SELECT * FROM user_account
        INNER JOIN user_info
        ON user_account.id = user_info.user_id;
        `);

    return rows;
}

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

async function postUser(username, description, hashedPassword) {
    await publicTable.query(
        `
        INSERT INTO user_account (username)
        VALUES ($1);
        `,
        [username],
    );

    await publicTable.query(
        `
        INSERT INTO user_info (user_id, description, account_creation_date)
        VALUES ((SELECT id FROM user_account WHERE username = $1), $2, (SELECT now()));
        `,
        [username, description],
    );

    await privateTable.query(
        `
        INSERT INTO user_password (username, hashed_password)
        VALUES ($1, $2);
        `,
        [username, hashedPassword],
    );
}

async function deleteUser(id) {
    await publicTable.query(
        `
        DELETE FROM post_like
        WHERE user_id = $1;
        `,
        [id],
    );

    await publicTable.query(
        `
        DELETE FROM comment_like
        WHERE user_id = $1;
        `,
        [id],
    );

    await publicTable.query(
        `
        DELETE FROM user_info
        WHERE user_id = $1;
        `,
        [id],
    );

    await publicTable.query(
        `
        DELETE FROM user_account
        WHERE id = $1;
        `,
        [id],
    );

    await publicTable.query(
        `
        DELETE FROM post
        WHERE user_id = $1;
        `,
        [id],
    );

    await publicTable.query(
        `
        DELETE FROM comment
        WHERE user_id = $1;
        `,
        [id],
    );

    await privateTable.query(
        `
        DELETE FROM user_password
        WHERE id = $1;
        `,
        [id],
    );
}

export { getUsers, getUser, getUsername, postUser, deleteUser };
