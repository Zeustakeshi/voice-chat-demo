import pool from "../../utils/database.js";

export default class UserModel {
    async register(username, email, password) {
        const { rows } = await pool.query(
            `INSERT INTO users (username, email, password) 
            VALUES ($1, $2, $3) RETURNING id, email, username`,
            [username, email, password]
        );
        return rows[0];
    }

    async findByEmail(email) {
        const { rows } = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
        return rows[0];
    }
}
