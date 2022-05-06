import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getAllEntries() {
    // Connect the client
    await prisma.$connect()
    // ... you will write your Prisma Client queries here
    const allEntries = await prisma.entries.findMany()
    return allEntries
}

async function findEntry(id) {
    // Connect the client
    console.log(id)
    await prisma.$connect()
    // ... you will write your Prisma Client queries here
    const allEntries = await prisma.entries.findFirst({
        where: {
            telegram_id: id,
        },
    })
    return allEntries
}

export default async function handler(req, res) {
    if (req.method !== 'GET') res.status(405).send("Not allowed method")
    try {
        //console.log(req.query)
        if (Object.keys(req.query).length === 0) {
            console.log('aaa')
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