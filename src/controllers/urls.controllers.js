import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function shortenUrl(req, res) {

    const { url } = req.body;
    const shortenedUrl = nanoid(8);

    try {
        const session = res.locals.session

        const token = session.rows[0].token
        const userId = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])

        await db.query(`INSERT INTO "shortedUrls" ("userId", url, "shortedUrl", "createdAt")
        VALUES ($1, $2, $3, NOW())`, [userId.rows[0].userId, url, shortenedUrl])

        res.status(201).send({ id: userId.rows[0].userId, shortUrl: shortenedUrl })
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function urlById(req, res) {

    const { id } = req.params

    try {
        const shortedUrls = await db.query(`SELECT * FROM "shortedUrls" WHERE id=$1`, [id])

        const infoShortedUrls = shortedUrls.rows[0]

        res.status(201).send({
            id: infoShortedUrls.id,
            shortUrl: infoShortedUrls.shortUrl,
            url: infoShortedUrls.url
        })
    } catch (err) {
        res.sendStatus(500)
    }
}