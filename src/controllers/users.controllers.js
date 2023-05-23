import { db } from "../database/database.connection.js";

export async function me(req, res) {

    try {
        const userId = res.locals.session

       const me = await db.query(`SELECT users.id, users.name, SUM("shortedUrls"."visitCount") AS "visitCount"
         FROM users
        JOIN "shortedUrls" ON "shortedUrls"."userId" = users.id
        JOIN sessions ON users.id = sessions."userId"
        WHERE "userId" = $1
        GROUP BY users.id;`, [userId])

        const url = await db.query(`SELECT "shortedUrls".id, "shortedUrls"."shortUrl", "shortedUrls".url, "shortedUrls"."visitCount"
        FROM "shortedUrls"
        JOIN sessions ON "shortedUrls"."userId" = sessions."userId"
        WHERE sessions.token = $1`, [token])

        const info = {
            id: me.rows[0].id,
            name: me.rows[0].name,
            visitCount: me.rows[0].visitCount,
            shortenedUrls: url.rows
        }

        res.status(200).send(info)
    } catch (err) {
        res.sendStatus(500)
    }
}