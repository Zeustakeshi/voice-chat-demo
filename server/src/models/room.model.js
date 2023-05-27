import pool from "../../utils/database.js";
export default class RoomModel {
    async create(id, name, userID) {
        const { rows } = await pool.query(
            `INSERT INTO rooms (id, name)
            VALUES ($1, $2) RETURNING *
        `,
            [id, name]
        );
        await pool.query(
            `
                INSERT INTO userinroom (userid, roomid)
                VALUES ($1, $2)
            `,
            [userID, id]
        );
        return rows[0];
    }

    async end(id) {
        const { rows } = await pool.query(
            `
                UPDATE rooms SET endedat = current_timestamp 
                WHERE id = $1 AND  endedat = NULL
                RETURNING *
            `,
            [id]
        );
        return rows[0];
    }

    async join(userID, roomID) {
        await pool.query(
            `
                INSERT INTO userinroom (userid, roomid)
                VALUES ($1, $2) 
            `,
            [userID, roomID]
        );
    }

    async leave(userID, roomID) {
        await pool.query(
            `
                DELETE FROM userinroom 
                WHERE userid = $1 AND roomid = $2
            `,
            [userID, roomID]
        );
    }

    async getRoomByUserID(userID) {
        const { rows } = await pool.query(
            `   
                SELECT ro.name, ro.id FROM userinroom uir
                LEFT JOIN rooms ro ON uir.roomid = ro.id
                LEFT JOIN users us ON uir.userid = us.id
                WHERE us.id = $1
            `,
            [userID]
        );
        return rows;
    }
}
