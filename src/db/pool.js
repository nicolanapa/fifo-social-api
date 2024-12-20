/* eslint-disable indent */
import pg from "pg";
import process from "process";

const { Pool } = pg;

const publicTable = new Pool(
    process.env.DB_CONNECTION_STRING === ""
        ? {
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              database: process.env.DB_PUBLIC_NAME,
              password: process.env.DB_PASSWORD,
              port: process.env.DB_PORT,
              ssl: process.env.SSL,
          }
        : {
              connectionString: process.env.DB_CONNECTION_STRING,
          },
);

const privateTable = new Pool(
    process.env.DB_CONNECTION_STRING === ""
        ? {
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              database: process.env.DB_PRIVATE_NAME,
              password: process.env.DB_PASSWORD,
              port: process.env.DB_PORT,
              ssl: process.env.SSL,
          }
        : {
              connectionString: process.env.DB_CONNECTION_STRING,
          },
);

export { publicTable, privateTable };
