import * as userQueries from "../db/queries/user.js";

async function checkIfUserAlreadyExists(value) {
    const userAlreadyExists = await userQueries.getUsername(value);

    if (!userAlreadyExists || userAlreadyExists.length === 0) {
        return true;
    }

    throw new Error("User already exists");
}

export { checkIfUserAlreadyExists };
