import {db} from "../database/database.connection.js"

export async function authValidate(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if(!token) return res.sendStatus(401)

    try {   
        next()
    }catch(err) {
        return res.status(500).send(err.message)
    }
}