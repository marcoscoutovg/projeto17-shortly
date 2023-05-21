import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function shortenUrl(req, res) {

    const { url } = req.body;
    const shortenedUrl = nanoid(8);

    try {
        const session = res.locals.session

        const token = session.rows[0].token
        const userId = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])

        await db.query(`INSERT INTO "shortedUrls" ("userId", url, "shortedUrl")
        VALUES ($1, $2, $3)`, [userId.rows[0].userId, url, shortenedUrl])

        res.status(201).send({ id: userId.rows[0].userId, shortUrl: shortenedUrl })
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function getUrlById(req, res) {

    const { id } = req.params

    try {
        const shortedUrls = await db.query(`SELECT id, "shortUrl", url FROM "shortedUrls" WHERE id=$1`, [id])

        if (shortedUrls.rows.length === 0) return res.status(404).send("URL não existe")
        res.status(201).send(shortedUrls.rows[0])
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function openUrl(req, res) {

    const { shortUrl } = req.body;

    try {
        const url = await db.query(`SELECT * FROM "shortedUrl" WHERE "shortUrl" = $1`,[shortUrl])
        if (url.rows.length === 0) return res.sendStatus(404);

        // procurar sobre res.redirect
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function deleteUrl(req, res) {

    const { id } = req.params;

    try {
        const url = await db.query(`DELETE FROM "shortedUrl" WHERE id = $1`,[id])
        if (url.rows.length === 0) return res.sendStatus(404)
        
        res.sendStatus(204)
    } catch (err) {
        res.sendStatus(500)
    }
}
