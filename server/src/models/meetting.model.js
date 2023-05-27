import pool from "../../utils/database.js";

export default class MeettingModel {
    async createMeeting(meettingID, roomID) {
        const { rows } = await pool.query(
            `
                INSERT INTO meettings (id, roomid)
                VALUES ($1, $2) RETURNING *
            `,
            [meettingID, roomID]
        );

        return rows[0];
    }

    async closeMeetting(meetingID, roomID) {
        const { rows } = await pool.query(
            `
                UPDATE meettings 
                SET endedat = CURRENT_TIMESTAMP
                WHERE id = $1 AND roomid = $2
                RETURNING *
            `,
            [meetingID, roomID]
        );
        return rows[0];
    }

    async getMeettingByRoomID(roomID) {
        const { rows } = await pool.query(
            `
                SELECT * FROM meettings WHERE roomid = $1
            `,
            [roomID]
        );
        return rows;
    }

    async join(userID, meettingID) {
        await pool.query(
            `
                INSERT INTO userInMeetting 
                (userid, meettingID)
                VALUES ($1, $2)
            `,
            [userID, meettingID]
        );
    }

    async getAllUserFromMeetting(mettingID) {
        const { rows } = await pool.query(
            `
            SELECT us.username FROM userinmeetting uimt
            JOIN meettings mt ON uimt.meettingid = mt.id
            JOIN users us ON us.id = uimt.userid
            WHERE mt.id = $1
        `,
            [mettingID]
        );
        return rows;
    }
}
