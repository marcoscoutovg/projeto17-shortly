import { db } from "../database/database.connection";

export async function me(req, res) {

    try {
        await db.query(`SELECT users.id, users.name, "visitCount"."shortedUrls" FROM users
        JOIN "shortedUrls" ON `)

        res.status(200).send()
    } catch (err) {

    }
}