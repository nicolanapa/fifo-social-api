import { publicTable, privateTable } from "./pool.js";

const SQL_PUBLIC = `
    CREATE TABLE IF NOT EXISTS user_account (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username TEXT
    );

    CREATE TABLE IF NOT EXISTS user_info (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES user_account(id),
        description TEXT,
        account_creation_date TIMESTAMP WITH TIME ZONE,
        admin BOOLEAN DEFAULT(false)
    );

    CREATE TABLE IF NOT EXISTS post (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES user_account(id),
        title TEXT,
        content TEXT,
        creation_date TIMESTAMP WITH TIME ZONE
    );

    CREATE TABLE IF NOT EXISTS post_like (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        post_id INTEGER REFERENCES post(id),
        user_id INTEGER REFERENCES user_account(id)
    );

    CREATE TABLE IF NOT EXISTS comment (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        post_id INTEGER REFERENCES post(id),
        user_id INTEGER REFERENCES user_account(id),
        content TEXT,
        creation_date TIMESTAMP WITH TIME ZONE
    );

    CREATE TABLE IF NOT EXISTS comment_like (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        comment_id INTEGER REFERENCES comment(id),
        user_id INTEGER REFERENCES user_account(id)
    );

    CREATE TABLE IF NOT EXISTS favorite_post (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        post_id INTEGER REFERENCES post(id),
        user_id INTEGER REFERENCES user_account(id)
    );

    CREATE TABLE IF NOT EXISTS favorite_comment (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        comment_id INTEGER REFERENCES comment(id),
        user_id INTEGER REFERENCES user_account(id)
    );
`;

const SQL_PRIVATE = `
    CREATE TABLE IF NOT EXISTS user_password (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username TEXT,
        hashed_password TEXT
    );
`;

async function main() {
    console.log("Creating tables...");

    publicTable.query(SQL_PUBLIC);

    privateTable.query(SQL_PRIVATE);

    console.log("Completed");
}

main();
