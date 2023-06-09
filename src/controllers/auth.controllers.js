import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  try {
    
    const verifyEmail = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    if (verifyEmail.rows.length > 0) return res.sendStatus(409);

    const hashPassword = bcrypt.hashSync(password, 10);

    await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hashPassword]);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const login = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    if (login.rows.length === 0) return res.status(401).send("E-mail não cadastrado!");

    const passwordCorrect = bcrypt.compareSync(password, login.rows[0].password);
    if (!passwordCorrect) return res.status(401).send("Senha incorreta!");

    const user = login.rows[0]

    const token = uuid();

    await db.query(`INSERT INTO sessions ("userId", name, token) VALUES ($1, $2, $3);`, [user.id, user.name, token]);
    res.status(200).send({token});
  } catch (err) {
    res.status(500).send(err.message);
  }
}