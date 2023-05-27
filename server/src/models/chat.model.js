import pool from "../../utils/database.js";
export default class ChatModel {
    async newChat(userID, roomID, mess) {
        const { rows } = await pool.query(
            `   
                INSERT INTO chats (userid, roomid, message)
                VALUES ($1, $2, $3)
                RETURNING *
            `,
            [userID, roomID, mess]
        );

        return rows[0];
    }
}
