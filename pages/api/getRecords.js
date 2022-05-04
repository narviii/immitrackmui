import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Connect the client
    await prisma.$connect()
    // ... you will write your Prisma Client queries here
    const allEntries = await prisma.entries.findMany()
    return allEntries
}

export default async function handler(req, res) {
    if (req.method !== 'GET') res.status(405).send("Not allowed method")
    try {
        const allEntries = await main()
        console.log(typeof(allEntries[0].biometry))
        res.status(202).json(allEntries)
    } catch (err) {
        console.log(err)
        res.status(500).send("Server error")
    } finally {
        await prisma.$disconnect()
    }

}