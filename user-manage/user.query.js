const createUserQuery = `INSERT INTO "User"("id", "first_name", "last_name", "age", "address", "email", "password") 
VALUES ($1, $2, $3, $4, $5, $6, $7)`;

const getAllUserQuery = `SELECT * FROM "User"`;

const getUserQuery = `SELECT * FROM "User" WHERE "id" = $1`;

const deleteUserQuery = `DELETE FROM "User" WHERE "id" = $1`;

const updateUserQuery = `UPDATE "User" SET "first_name" = $1, "last_name" = $2, 
                      "age" = $3, "address" = $4, "email" = $5, "password"= $6 WHERE "id" = $7`;

module.exports = {
  createUserQuery,
  getAllUserQuery,
  getUserQuery,
  deleteUserQuery,
  updateUserQuery,
};
