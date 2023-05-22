export async function authValidate(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401)

    try {   
        const session = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])
        if(session.rows.length === 0) return res.sendStatus(401)
        res.locals.userId = user.rows[0].id;
        next()
    }catch(err) {
        return res.status(500).send(err.message)
    }
}