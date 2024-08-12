const db = require('./dataBase');

// SQL queries
const createUser = `
    INSERT INTO users (RoleID, firstName, lastName, Email, phoneNumber, linkedIn)
    VALUES (?, ?, ?, ?, ?, ?)
`;

const findUserByEmail = `
    SELECT * FROM users WHERE Email = ?
`;

const createRole = `
    INSERT INTO roles (roleName)
    VALUES (?)
`;

// Function to find or create a user
const findOrCreateUser = async (userData) => {
    try {
        // Check if the user already exists
        let [user] = await db.query(findUserByEmail, [userData.Email]);
        if (user.length > 0) {
            return user[0]; // User found, return user data
        }

        // User does not exist, create a new user
        let [role] = await db.query(createRole, ['User']); // Adjust the role name as needed
        const roleId = role.insertId;

        await db.query(createUser, [
            roleId,
            userData.firstName,
            userData.lastName,
            userData.Email,
            userData.phoneNumber || null, // Ensure phoneNumber is correctly handled
            userData.linkedIn
        ]);

        // Fetch newly created user
        [user] = await db.query(findUserByEmail, [userData.Email]);
        return user[0];
    } catch (error) {
        console.error('Error in findOrCreateUser:', error);
        throw error;
    }
};

module.exports = { findOrCreateUser };
