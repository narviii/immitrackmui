const secret = process.env.BOT_TOKEN
import { TelegramLogin } from 'node-telegram-login'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const TelegramAuth = new TelegramLogin(secret);

async function writeDB(data, token) {
    //console.log(token)
    await prisma.$connect()
    await prisma.entries.upsert({
        where: { telegram_id: token.id },
        create: {
            applied: data.applied,
            biometry: data.applied,
            biometry_place: data.biometry_place?.label,
            approved: data.approved,
            passport_submited: data.passport_submited,
            country: data.country?.label,
            revieved: data.revieved,
            telegram_id: token.id,
            username: token.username,
        },
        update: {
            applied: data.applied,
            biometry: data.applied,
            biometry_place: data.biometry_place?.label,
            approved: data.approved,
            passport_submited: data.passport_submited,
            country: data.country?.label,
            revieved: data.revieved,
            username: token.username,
        }
    })
    await prisma.users.upsert({
        where: { telegram_id: token.id },
        create: {
            first_name: token.first_name,
            auth_date: token.auth_date,
            hash: token.hash,
            telegram_id: token.id,
            last_name: token.last_name,
            photo_url: token.photo_url,
            username: token.username
        },
        update: {
            first_name: token.first_name,
            auth_date: token.auth_date,
            hash: token.hash,
            last_name: token.last_name,
            photo_url: token.photo_url,
            username: token.username
        },
    })
    await prisma.$disconnect()

}

export default function handler(req, res) {
    if (req.method !== 'POST') res.status(405).send("Not allowed method")
    try {
        const token = TelegramAuth.checkLoginData(JSON.parse(req.headers.authorization.split(' ')[1]))
        if (token) {
            writeDB(req.body, token)
            res.status(202).send(`Updated record for ${token.username}`)
        } else res.status(511).send("Token not valid. Not authorized.")
    } catch (error) {
        res.status(511).send("Some error. Not authorized")
    }


}
