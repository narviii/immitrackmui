import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getAllEntries() {
    // Connect the client
    await prisma.$connect()
    // ... you will write your Prisma Client queries here
    const allEntries = await prisma.entriesSync.findMany()
    const allMainEntries = await prisma.entriesMain.findMany()
    //console.log(allMainEntries)
    return allEntries.concat(allMainEntries)
}

async function findEntry(id) {
    // Connect the client
    await prisma.$connect()
    // ... you will write your Prisma Client queries here
    const allEntries = await prisma.entriesMain.findFirst({
        where: {
            telegram_id: parseFloat(id),
        },
    })
    return allEntries
}

export default async function handler(req, res) {
    if (req.method !== 'GET') res.status(405).send("Not allowed method")
    try {
        //console.log(req.query)
        if (Object.keys(req.query).length === 0) {
            const allEntries = await getAllEntries()
            res.status(202).json(allEntries)
        } else {
            const entry = await findEntry(req.query.id)
            res.status(202).json(entry)
        }

    } catch (err) {
        console.log(err)
        res.status(500).send("Server error")
    } finally {
        await prisma.$disconnect()
    }

}