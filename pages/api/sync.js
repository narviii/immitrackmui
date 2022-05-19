const { GoogleSpreadsheet } = require('google-spreadsheet');
const dayjs = require('dayjs')
import ExcelDateToJSDate from '../../helpers/exceltojs';
import { PrismaClient } from '@prisma/client'
const syncSecret = process.env.SYNC_TOKEN

const creds = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
}


const prisma = new PrismaClient()






function getRowData(sheet, rowNum) {
    if (sheet.getCell(rowNum, 0).value) {
        return {
            username: sheet.getCell(rowNum, 0).value,
            applied: ExcelDateToJSDate(sheet.getCell(rowNum, 1).value),
            biometry: ExcelDateToJSDate(sheet.getCell(rowNum, 2).value),
            biometry_place: sheet.getCell(rowNum, 3).value,
            approved: ExcelDateToJSDate(sheet.getCell(rowNum, 4).value),
            passport_submited: ExcelDateToJSDate(sheet.getCell(rowNum, 6).value),
            country: sheet.getCell(rowNum, 7).value,
            recieved: ExcelDateToJSDate(sheet.getCell(rowNum, 8).value),
            notes: sheet.getCell(rowNum, 10).value,
            index: rowNum
        }
    } else return null

}

async function writeEntry(entry) {
    try {
        await prisma.entriesSync.upsert({
            where: { index: entry.index },
            create: {
                applied: entry.applied,
                biometry: entry.biometry,
                biometry_place: entry.biometry_place,
                approved: entry.approved,
                passport_submited: entry.passport_submited,
                country: entry.country,
                recieved: entry.recieved,
                username: entry.username || undefined,
                index: entry.index,
                notes: entry.notes
            },
            update: {
                applied: entry.applied,
                biometry: entry.biometry,
                biometry_place: entry.biometry_place,
                approved: entry.approved,
                passport_submited: entry.passport_submited,
                country: entry.country,
                recieved: entry.recieved,
                username: entry.username,
                notes: entry.notes
            }
        })
        console.log(`Written entry ${entry.index}. It's ${entry.username}`)
    } catch (error) {
        console.log(`Error with entry ${entry.index}. It's ${entry.username}`)
        console.log(error)
    }


}

function findDiff(newObj, oldObj) {
    const diff = {};
    if (!oldObj) return newObj
    for (const [key, value] of Object.entries(newObj)) {
        if (String(value) != String(oldObj[key])) {
            diff[key] = value;
        }
    }
    return (Object.keys(diff).length !== 0) ? diff : null;
}
async function writeEntries(entries) {
    await prisma.$connect()
    entries.map(async (entry) => {
        const dbEntry = await prisma.entriesSync.findUnique({ where: { index: entry.index } })
        //console.log(entry)
        //console.log(dbEntry)
        //console.log(entry.index)
        const diff = findDiff(entry, dbEntry)
        if (diff) {
            console.log(diff)
            diff.index = entry.index
            diff.username = entry.username
            console.log(`Writing entry ${entry.index}`)
            writeEntry(diff)
        }
    })

    await prisma.$disconnect()
}


export default async function handler(req, res) {

    if (req.headers.authorization.split(' ')[1] !== syncSecret) return res.status(511).send("Not authorized")

    try {
        const doc = new GoogleSpreadsheet('1sgUPbogDw7V4rakrBSJ07_YLhvVem79rtGq7Xj__ec0');
        const entries = []

        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        await sheet.loadCells(`A1:L${rows.length}`);
        console.log(rows.length)
        //console.log(`A1:L${rows.length}`)
        for (let i = 1; i < rows.length; i++) {
            const entry = await getRowData(sheet, i)
            if (entry) { entries.push(entry) }
        }
        //console.log(JSON.stringify(entries,null,2))

        writeEntries(entries)
        console.log("Done!")

        res.status(200).send(entries)

    } catch (err) {
        console.log(err)
        res.status(500).send("Erorr")

    }
}