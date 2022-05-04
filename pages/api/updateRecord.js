const secret = process.env.BOT_TOKEN
import { TelegramLogin } from 'node-telegram-login'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const TelegramAuth = new TelegramLogin(secret);

async function writeDB(token) {
    await prisma.$connect()
    await prisma.entries.create({
        data:{
            country:"Russia",
            telegram_id:token.id
        }
    })
}

export default function handler(req, res) {
    if (req.method !== 'POST') res.status(405).send("Not allowed method")
    try {
        const token = TelegramAuth.checkLoginData(JSON.parse(req.headers.authorization.split(' ')[1]))
        if (token) {
            console.log(token)
            writeDB(token)
            res.status(202).send(`Hey ${token.first_name}`)
        } else res.status(511).send("Not authorized")
    } catch (error) {
        res.status(511).send("Not authorized")
    }

}
