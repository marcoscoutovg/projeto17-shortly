import { db } from "../database/database.connection";

export async function me(req, res) {

    try {
        const session = res.locals.session
        const token = session.rows[0].token

        await db.query(`SELECT users.id, users.name, SUM("shortedUrls"."visitCount") AS "visitCount"
         FROM users
        JOIN "shortedUrls" ON 
        WHERE token = $1;`[token])

        res.status(200).send()
    } catch (err) {

    }
}