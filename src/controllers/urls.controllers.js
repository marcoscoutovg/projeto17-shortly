import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function shortenUrl(req, res) {

    const { url } = req.body;
    const { userId } = res.locals.session
    const shortUrl = nanoid(8);

    try {

        await db.query(`INSERT INTO shortedUrls ("userId", url, "shortUrl")
        VALUES ($1, $2, $3);`, [userId, url, shortUrl])

        const dataUrl = await db.query(`SELECT * FROM shorteudrls WHERE "shortUrl" = $1;`, [shortUrl])

        res.status(201).send({ id: dataUrl.rows[0].id, shortUrl })
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function getUrlById(req, res) {

    const { id } = req.params

    try {
        const infoUrls = await db.query(`SELECT id, shortUrl, url FROM "shortedUrls" WHERE id=$1;`, [id])

        if (infoUrls.rows.length === 0) return res.status(404).send("URL não existe")
        res.status(200).send(infoUrls.rows[0])
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function openUrl(req, res) {

    const { shortUrl } = req.body;

    try {
        const infoUrl = await db.query(`SELECT * FROM shortedUrls WHERE "shortUrl" = $1;`, [shortUrl])
        if (infoUrl.rows.length === 0) return res.sendStatus(404);

        await db.query(`UPDATE shortedUrls SET "visitCount" = visitCount" + 1 WHERE "shortUrl"=$1;`, [shortUrl])
        const url = infoUrl.rows[0].url
        return res.redirect(url);
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function deleteUrl(req, res) {

    const { id } = req.params;

    try {

        const url = await db.query(`SELECT * FROM shortedUrls WHERE id = $1;`, [id])

        if (url.rows.length === 0) return res.sendStatus(404)

        await db.query(`DELETE FROM "shortedUrls" WHERE id = $1`, [id])
        res.sendStatus(204)
    } catch (err) {
        res.sendStatus(500)
    }
}
