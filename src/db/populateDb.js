import { publicTable, privateTable } from "./pool.js";

const SQL_PUBLIC = `
    CREATE TABLE IF NOT EXISTS user_account (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username TEXT
    );

    CREATE TABLE IF NOT EXISTS user_info (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id REFERENCES user_account(id),
        description TEXT,
        account_creation_date TIMESTAMP WITH TIME ZONE,
        admin BOOLEAN DEFAULT(false)
    );

    CREATE TABLE IF NOT EXISTS post (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id REFERENCES user_account(id),
        title TEXT,
        content TEXT,
        likes INTEGER DEFAULT(0),
        creation_date TIMESTAMP WITH TIME ZONE
    );

    CREATE TABLE IF NOT EXISTS comment (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        post_id REFERENCES post(id),
        content TEST,
        likes INTEGER DEFAULT(0)
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
