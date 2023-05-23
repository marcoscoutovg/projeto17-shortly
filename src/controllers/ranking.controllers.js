import { db } from "../database/database.connection.js";

export async function getRanking(req, res) {
    try {
        const ranking = await db.query(`SELECT users.id, users.name, COUNT(shortedUrls."shortUrl") AS
        "linksCount", SUM(shortedUrls."visitCount") AS "visitCount" 
        FROM users
        JOIN shortedUrls ON shortedUrls.userId = users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;`)

        res.status(200).send(ranking.rows)
    } catch(err) {
        res.sendStatus(500)
    }
}