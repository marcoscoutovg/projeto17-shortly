export async function authValidate(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401)

    try {   
        const session = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])
        if(!session) return res.sendStatus(401)
        res.locals.session = session
        next()
    }catch(err) {
        return res.status(500).send(err.message)
    }
}